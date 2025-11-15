import Categorias from "../../Model/Categoria"
import Log from "../../Model/Log"
import Transacao from "../../Model/Transacao"
import Usuario from "../../Model/Usuario"
import { delete_categoria, delete_usuario } from "../../Repository/db"
import { deleteLogController } from "../Cadastros/LogController"

export async function deleteCategoriaController(transacao: Transacao, usuario_logado: number){

    try{
        delete_categoria(transacao.id)
        deleteLogController(usuario_logado)
        console.log("Transacao deletada com sucesso!")
    }catch(err){
        console.log("Erro", err)
    }
}