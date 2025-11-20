import Log from "../../Model/Log"
import { cadastrar_log } from "../../Repository/db"

export async function cadastroLogController(usuario_logado: number, identificador?:string){
    try{
        const logCadastro:Log = {
            usuarioId: usuario_logado,
            acao: "Cadastro",
            detalhes: identificador ? `Elemento ${identificador} cadastrado com sucesso.` : `Elemento cadastrado com sucesso.`,
            dataHora: new Date()
        }
        cadastrar_log(logCadastro)
    }catch(err){
        console.log("Erro", err)
    }
}
export async function deleteLogController(usuario_logado: number, identificador?:string){
    try{
        const logCadastro:Log = {
            usuarioId: usuario_logado,
            acao: "Exclusão",
            detalhes: identificador ? `Elemento ${identificador} excluído com sucesso.` : `Elemento excluído com sucesso.`,
            dataHora: new Date()
        }
        cadastrar_log(logCadastro)
    }catch(err){
        console.log("Erro", err)
    }
}