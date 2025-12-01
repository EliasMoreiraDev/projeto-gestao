import { menuPrincipal } from '..';
import Usuario from '../Model/Usuario';
import * as UsuarioService from '../Services/UsuarioService';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();


export async function menuUsuario(usuarioLogadoId: number) {
    while (true) {
        console.log('\n--- Menu Usuário ---');
        console.log('1 - Cadastro');
        console.log('2 - Listar todos');
        console.log('3 - Listar por id');
        console.log('4 - Atualizar');
        console.log('5 - Deletar');
        console.log('0 - Voltar');
        const opt = prompt('Escolha: ');
        switch (opt) {
            case '1': await cadastro(usuarioLogadoId); break;
            case '2': await listar(); break;
            case '3': await listarPorId(); break;
            case '4': await atualizar(usuarioLogadoId); break;
            case '5': await deletar(usuarioLogadoId); break;
            case '0': return menuPrincipal();
            default: console.log('Opção inválida.');
        }
    }
}

export async function cadastro(usuarioLogadoId: number) {
    try {
        const nome = prompt('Nome: ');
        const email = prompt('Email: ');
        const senha = prompt.hide('Senha: ');
        const novoUsuario: Usuario = { nome, email, senha };
        await UsuarioService.CadastrarUsuarioService(novoUsuario, usuarioLogadoId);
        console.log('Usuário criado com sucesso!');
    } catch (err: any) {
        console.error('Erro ao cadastrar:', err.message);
    }
}

export async function listar() {
    try {
        const users = await UsuarioService.ListarUsuariosService();
        if (users.length === 0) {
            console.log('Nenhum usuário encontrado.');
            return;
        }
        console.table(users);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}

export async function listarPorId() {
    try {
        const id = Number(prompt('Id: '));
        const user = await UsuarioService.ListarUsuarioPorId(id);
        if (!user) {
            console.log('Usuário não encontrado');
            return;
        }
        console.log('Usuário encontrado:');
        console.log(user);
    } catch (err: any) {
        console.error('Erro ao listar:', err.message);
    }
}

export async function atualizar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id do usuário a atualizar: '));
        
        const nome = prompt('Novo nome (enter para manter): ');
        const email = prompt('Novo email (enter para manter): ');
        const updated = await UsuarioService.UpdateUsuarioService(id,nome, email, usuarioLogadoId);
        console.log('Usuário atualizado:', updated);
    } catch (err: any) {
        console.error('Erro ao atualizar:', err.message);
    }
}

export async function deletar(usuarioLogadoId: number) {
    try {
        const id = Number(prompt('Id do usuário a deletar: '));
       
        await UsuarioService.deletarUsuarioService(id,usuarioLogadoId);
        console.log('Usuário deletado.');
    } catch (err: any) {
        console.error('Erro ao deletar:', err.message);
    }
}

export async function login() {
    try {
        
        console.log('\n=== Login ===');
        const email = prompt('Email: ');
        const senha = prompt('Senha: ');
        const login = await UsuarioService.loginService(email, senha);
        if(login){
            console.log(`Login bem-sucedido. Bem-vindo, ${login.nome}!`);
            return login.id;
        }
    } catch (err: any) {
        console.error('Erro ao fazer login:', err.message);
    }
}