import Conta from "../../Model/Conta"
import { cadastrar_conta} from "../../Repository/db"
import ContaService from "../../Services/ContaService"
import { cadastroLogController } from "./LogController"

export default async function cadastroCategoriaController(conta: Conta, usuario_logado: number){
    try{
        ContaService(conta, usuario_logado)
        console.log("Cadastro de Conta realizado")
    }catch(err){
        console.log("Erro", err)
    }
}
