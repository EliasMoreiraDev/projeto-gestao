import Usuario from "../../Model/Usuario"
import { cadastrar_usuario } from "../../Repository/db"
import UsuarioService from "../../Services/UsuarioService"
import { cadastroLogController } from "./LogController"

export async function cadastroUsuarioController(usuario: Usuario, usuario_logado: number){
    try{
        UsuarioService(usuario, usuario_logado)
        console.log("Cadastro de usuário realizado")
    }catch(err){
        console.log("Erro", err)
    }
}