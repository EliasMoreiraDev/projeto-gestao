import Conta from "../../Model/Conta"
import Log from "../../Model/Log"
import Usuario from "../../Model/Usuario"
import { cadastrar_log, delete_conta, delete_usuario } from "../../Repository/db"
import { deleteLogController } from "../Cadastros/LogController"

export default async function deleteContaController(id: number, usuario_logado: number){
    try{
        delete_conta(id)
        deleteLogController(usuario_logado)
        console.log("Conta deletado com sucesso!")
    }catch(err){
        console.log("Erro", err)
    }
}