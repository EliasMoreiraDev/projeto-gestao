import Log from "../../Model/Log"
import { cadastrar_log } from "../../Repository/db"

export async function cadastroLogController(usuario_logado: number){
    try{
        const logCadastro:Log = {
            usuarioId: usuario_logado,
            acao: "Cadastro",
            detalhes: `Elemento cadastrado com sucesso.`,
            dataHora: new Date()
        }
        cadastrar_log(logCadastro)
    }catch(err){
        console.log("Erro", err)
    }
}
export async function deleteLogController(usuario_logado: number){
    try{
        const logCadastro:Log = {
            usuarioId: usuario_logado,
            acao: "Exclusão",
            detalhes: `Elemento deletado com sucesso.`,
            dataHora: new Date()
        }
        cadastrar_log(logCadastro)
    }catch(err){
        console.log("Erro", err)
    }
}