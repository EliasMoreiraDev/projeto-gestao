import Conta from "../../Model/Conta"
import { cadastrar_conta} from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export async function cadastroCategoriaController(conta: Conta, usuario_logado: number){
    try{
        cadastrar_conta(conta)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de Conta realizado")
    }catch(err){
        console.log("Erro", err)
    }
}