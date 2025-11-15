import Transacao from "../../Model/Transacao"
import { cadastrar_transacao} from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export async function cadastroCategoriaController(transacao: Transacao, usuario_logado: number){
    try{
        cadastrar_transacao(transacao)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de Transação realizado")
    }catch(err){
        console.log("Erro", err)
    }
}