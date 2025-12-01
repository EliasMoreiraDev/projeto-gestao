import Tag from '../Model/Tag';
import * as TagService from '../Services/TagService';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

export async function menuTag(usuarioLogadoId: number) {
    while (true) {
        console.log('\n--- Menu Tag ---');
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
        const nome = prompt('Nome da tag: ');
        const tag: Tag = { nome };
        await TagService.CadastrarTagService(tag, usuarioLogadoId);
        console.log('Tag criada:', tag);
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function listar() {
    try {
        const tags = await TagService.ListarTagService();
        console.table(tags);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}

export async function deletar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id da tag a deletar: '));
        await TagService.DeletarTagService(id, usuarioLogadoId);
        
        console.log('Tag deletada.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}