import Categorias from '../Model/Categoria';
import tipoCategoria from '../Model/enums/tipoCategoria';
import * as CategoriaService from '../Services/CategoriaService';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();


export async function menuCategoria(usuarioLogadoId: number) {
    while (true) {
        console.log('\n--- Menu Categoria ---');
        console.log('1 - Cadastro');
        console.log('2 - Listar');
        console.log('3 - Deletar');
        console.log('0 - Voltar');
        const opt = prompt('Escolha: ');
        switch (opt) {
            case '1': await cadastro(usuarioLogadoId); break;
            case '2': await listar(); break;
            case '3': await deletar(usuarioLogadoId); break;
            case '0': return;
            default: console.log('Opção inválida.');
        }
    }
}

export async function cadastro(usuarioLogadoId: number) {
    try {
        const nome = prompt('Nome da categoria: ');
        const tipoInput = prompt('Tipo (1 - Receita / 2 - Despesa): ');

        if (tipoInput !== '1' && tipoInput !== '2') {
            console.error('Erro: Tipo inválido. Use 1 para Receita ou 2 para Despesa.');
            return cadastro(usuarioLogadoId);
        }
        const tipo = tipoInput == '1' ? tipoCategoria.RECEITA : tipoCategoria.DESPESA;

        const categoria: Categorias = { nome, tipo };
        await CategoriaService.CadastroCategoriaService(categoria, usuarioLogadoId );
        console.log('Categoria criada');
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function listar() {
    try {
        const cat = await CategoriaService.ListarCategoriaService();
        console.table(cat);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}

export async function deletar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id da categoria a deletar: '));
        await CategoriaService.DeletarCategoriaService(id, usuarioLogadoId);
        
        console.log('Categoria deletada.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}
