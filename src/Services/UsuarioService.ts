import { cadastroLogController } from "../Controller/Cadastros/LogController";
import Usuario from "../Model/Usuario";
import { cadastrar_usuario, cadastrar_log } from "../Repository/db";
import bcrypt from 'bcrypt';

async function UsuarioService(usuario: Usuario, usuarioLogadoId: number) {
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

export default UsuarioService;