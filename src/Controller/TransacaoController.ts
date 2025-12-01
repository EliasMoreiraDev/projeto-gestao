import tipoCategoria from "../Model/enums/tipoCategoria";
import Transacao from "../Model/Transacao";
import { CadastrarTransacaoService, DeletarTransacaoService, ListarTransacaoUsuarioService } from "../Services/TransacaoService";

import PromptSync from 'prompt-sync';

const prompt = PromptSync();


export async function menuTransacao(usuarioLogadoId: number) {
    while (true) {
        console.log('\n=== Menu de Transações ===');
        console.log('1 - Cadastrar Transação');
        console.log('2 - Listar Minhas Transações');
        console.log('3 - Deletar Transação');
        console.log('0 - Voltar');
        const opt = prompt('Escolha: ');
        switch (opt) {
            case '1': await cadastrar(usuarioLogadoId); break;
            case '2': await listar(usuarioLogadoId); break;
            case '3': await deletar(usuarioLogadoId); break;
            case '0': return;
            default: console.log('Opção inválida.');
        }
    }
}
function validarData(data: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) {
        return false;
    }else {
        const partes = data.split('-');
        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; 
        const dia = parseInt(partes[2], 10);
        const dataObj = new Date(ano, mes, dia);
        return (dataObj.getFullYear() === ano && dataObj.getMonth() === mes && dataObj.getDate() === dia);
    }
}
export async function cadastrar(usuarioLogadoId: number) {
    try {
        const contaId = Number(prompt('ID da Conta: '));
        const tipoInput = prompt('Tipo (1 - Receita / 2 - Despesa): ');
        if (tipoInput !== '1' && tipoInput !== '2') {
            console.error('Erro: Tipo inválido. Use 1 para Receita ou 2 para Despesa.');
            return cadastrar(usuarioLogadoId);
        }
        const tipo = tipoInput === '1' ? tipoCategoria.RECEITA : tipoCategoria.DESPESA;
        const categoriaId = Number(prompt('ID da Categoria: '));
        const valor = Number(prompt('Valor: '));
        const dataTransacao: any = prompt('Data (YYYY-MM-DD): ');
       
        if (!validarData(dataTransacao)) {
            console.error('Erro: Data inválida. Use o formato YYYY-MM-DD.');
            return cadastrar(usuarioLogadoId);
        }
        const tagsInput = prompt('Tags (separadas por vírgula): ');
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
         
        const descricao: any = prompt('Descrição: ');
        const transacao: Transacao = { contaId, categoriaId, valor, tipo, dataTransacao, descricao, tags };
        await CadastrarTransacaoService(transacao, usuarioLogadoId);
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function deletar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id da transação a deletar: '));
        await DeletarTransacaoService(id, usuarioLogadoId);
        console.log('Transação deletada.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}
export async function listar(usuarioLogadoId: number) {
    try {
            try {
                const transacoes = await ListarTransacaoUsuarioService(usuarioLogadoId);
                
                console.table(transacoes);
            } catch (err: any) {
                console.error('Erro ao listar:', err.message);
            }
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}
