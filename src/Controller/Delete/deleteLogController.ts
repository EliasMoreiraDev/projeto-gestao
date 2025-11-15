import Categorias from "../../Model/Categoria"
import Log from "../../Model/Log"
import Usuario from "../../Model/Usuario"
import { delete_categoria, delete_usuario } from "../../Repository/db"
import { deleteLogController } from "../Cadastros/LogController"

export async function deleteTransacaoController(categoria: Categorias, usuario_logado: number){

    try{
        delete_categoria(categoria.id)
        deleteLogController(usuario_logado)
        console.log("Log deletada com sucesso!")
    }catch(err){
        console.log("Erro", err)
    }
}