import Usuario from "../../Model/Usuario"
import { cadastrar_usuario } from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export async function cadastroUsuarioController(usuario: Usuario, usuario_logado: number){
    try{
        cadastrar_usuario(usuario)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de usuário realizado")
    }catch(err){
        console.log("Erro", err)
    }
}