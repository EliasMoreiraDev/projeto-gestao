import TransacaoTag from "../../Model/TransacaoTag"
import { cadastrar_transacaoTag} from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export async function cadastroTransacaoTagController(transacaoTag: TransacaoTag, usuario_logado: number){
    try{
        cadastrar_transacaoTag(transacaoTag)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de TransaçãoTag realizado")
    }catch(err){
        console.log("Erro", err)
    }
}