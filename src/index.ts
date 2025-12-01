import { menuCategoria } from "./Controller/CategoriaController";
import { menuConta } from "./Controller/ContaController";
import { menuTag } from "./Controller/TagController";
import { menuTransacao } from "./Controller/TransacaoController";
import { login, menuUsuario } from "./Controller/UsuarioController";
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

async function menuPrincipal() {
    while (true) {
        const usuarioLogadoId = await login();
        if (usuarioLogadoId) {
            console.log('\n=== MENU PRINCIPAL ===');
            console.log('1 - Usuário');
            console.log('2 - Conta');
            console.log('3 - Categoria');
            console.log('4 - Tag');
            console.log('5 - Transação');
            console.log('0 - Sair');
            const opt = prompt('Escolha uma opção: ');

            switch (opt) {
                case '1':
                    await menuUsuario(usuarioLogadoId);
                    break;
                case '2':
                    await menuConta(usuarioLogadoId);
                    break;
                case '3':
                    await menuCategoria(usuarioLogadoId);
                    break;
                case '4':
                    await menuTag(usuarioLogadoId);
                    break;
                case '5':
                    await menuTransacao(usuarioLogadoId);
                    break;
                case '0':
                    console.log('Saindo...');
                    process.exit(0);
                default:
                    console.log('Opção inválida.');
            }
        }
    }
}

menuPrincipal();