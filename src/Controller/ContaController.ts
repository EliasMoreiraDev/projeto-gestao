import Conta from '../Model/Conta';
import * as ContaService from '../Services/ContaService';
import * as UsuarioService from '../Services/UsuarioService';

import PromptSync from 'prompt-sync';

const prompt = PromptSync();


export async function menuConta(usuarioLogadoId: number) {
    while (true) {
        console.log('\n--- Menu Conta ---');
        console.log('1 - Cadastro');
        console.log('2 - Listar minhas contas');
        console.log('3 - Deletar');
        console.log('0 - Voltar');
        const opt = prompt('Escolha: ');
        switch (opt) {
            case '1': await cadastro(usuarioLogadoId); break;
            case '2': await listar(usuarioLogadoId); break;
            case '3': await deletar(usuarioLogadoId); break;
            case '0': return;
            default: console.log('Opção inválida.');
        }
    }
}

export async function cadastro(usuarioLogadoId: number) {
    try {
        const nome = prompt('Nome da conta: ');
        const descricao = prompt('Descrição: ');
        const saldo = Number(prompt('Saldo Inicial: '));

        const conta: Conta = { nome, descricao, saldo, titular: usuarioLogadoId };
        await ContaService.CadastrarContaService(conta, usuarioLogadoId);
        
        console.log('Conta criada:', conta);
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function listar(usuarioLogadoId: number) {
    try {
        const contas = await ContaService.ListarContaUsuarioService(usuarioLogadoId);
        
        console.table(contas);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}


export async function deletar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id da conta a deletar: '));
        await ContaService.DeletarContaService(id, usuarioLogadoId);
        console.log('Conta deletada.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}