import { cadastroLogController } from "../Controller/LogController";
import Usuario from "../Model/Usuario";
import { cadastrar_usuario, listar_todos_usuarios, delete_usuario, listar_usuario_por_id, update_usuario, listar_usuario_por_email } from "../Repository/db";
import bcrypt from 'bcrypt';

export async function CadastrarUsuarioService(usuario: Usuario, usuarioLogadoId: number) {
    if(!usuario.email || !usuario.email.includes("@")) {
        throw new Error("Email inválido.");
    }
    if(usuario.senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
    }
    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaCriptografada;
    usuario.dataCriacao = new Date();
    await cadastrar_usuario(usuario);
    
    await cadastroLogController(usuarioLogadoId, usuario.nome);
}

export async function ListarUsuariosService() {
    return await listar_todos_usuarios()
}
export async function ListarUsuarioPorId(idUsuario: number) {
    return await listar_usuario_por_id(idUsuario);
}
export async function deletarUsuarioService(idUsuario: number, usuarioLogadoId: number) {
    const usuarios = await listar_todos_usuarios();
    if(!usuarios.find(user => user.id === idUsuario)){
        return console.log("Usuário não encontrado.");
    }
    await delete_usuario(idUsuario);

    await cadastroLogController(usuarioLogadoId);
}

export async function UpdateUsuarioService(idUsuario: number, nome:string, email:string, usuarioLogadoId: number) {
    const user = await ListarUsuarioPorId(idUsuario);
    if (!user) {
        console.log('✗ Usuário não encontrado');
        return;
    }
    if (!nome) {
        nome = user.nome;
    }
    if (!email) {
        email = user.email;
    }
    await update_usuario(idUsuario, nome, email);
    await cadastroLogController(usuarioLogadoId);
}

export async function loginService(email: string, senha: string) {
    const usuario = await listar_usuario_por_email(email);
    if (!usuario) {
        return console.log("Usuário não encontrado.");
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        return console.log("Senha inválida.");
    }else{
        return usuario;
    }
}