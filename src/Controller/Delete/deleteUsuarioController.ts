import Log from "../../Model/Log"
import Usuario from "../../Model/Usuario"
import { cadastrar_log, delete_usuario } from "../../Repository/db"
import { deleteLogController } from "../Cadastros/LogController"

export async function deleteUsuarioController(usuario: Usuario, usuario_logado: number){
    try{
        delete_usuario(usuario.id)
        deleteLogController(usuario_logado)
        console.log("Usuário deletado com sucesso!")
    }catch(err){
        console.log("Erro", err)
    }
}