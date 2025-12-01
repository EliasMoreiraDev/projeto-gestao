import { menuCategoria } from "./Controller/CategoriaController";
import { menuConta } from "./Controller/ContaController";
import { menuTag } from "./Controller/TagController";
import { menuTransacao } from "./Controller/TransacaoController";
import { login, menuUsuario } from "./Controller/UsuarioController";
import PromptSync from 'prompt-sync';

const prompt = PromptSync();



export async function menuPrincipal() {
    let logado = false;
    let usuarioLogadoId: number | undefined = undefined;
    while (true) {
        if(logado === false){
           usuarioLogadoId = await login();
        };
        if (usuarioLogadoId) {
            logado = true;
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
                    console.clear();
                    await menuUsuario(usuarioLogadoId);
                    break;
                case '2':
                    console.clear();
                    await menuConta(usuarioLogadoId);
                    break;
                case '3':
                    console.clear();
                    await menuCategoria(usuarioLogadoId);
                    break;
                case '4':
                    console.clear();
                    await menuTag(usuarioLogadoId);
                    break;
                case '5':
                    console.clear();
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