import Conta from '../Model/Conta';
import * as ContaService from '../Services/ContaService';
import * as UsuarioService from '../Services/UsuarioService';

import PromptSync from 'prompt-sync';

const prompt = PromptSync();


export async function menuConta() {
    while (true) {
        console.log('\n--- Menu Conta ---');
        console.log('1 - Cadastro');
        console.log('2 - Listar minhas contas');
        console.log('3 - Deletar');
        console.log('0 - Voltar');
        const opt = prompt('Escolha: ');
        switch (opt) {
            case '1': await cadastro(); break;
            case '2': await listar(); break;
            case '3': await deletar(); break;
            case '0': return;
            default: console.log('Opção inválida.');
        }
    }
}

export async function cadastro() {
    try {
        const nome = prompt('Nome da conta: ');
        const descricao = prompt('Descrição: ');
        const saldo = Number(prompt('Saldo Inicial: '));

        const conta: Conta = { nome, descricao, saldo, titular: 1 };
        await ContaService.CadastrarContaService(conta, 1);
        
        console.log('Conta criada:', conta);
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function listar() {
    try {
        const contas = await ContaService.ListarContaUsuarioService(1);
        
        console.table(contas);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}


export async function deletar() {
    try {
        const id = Number(prompt('Id da conta a deletar: '));
        await ContaService.DeletarContaService(id, 1);
        console.log('Conta deletada.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}