import Tag from "../../Model/Tag"
import { cadastrar_tag } from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export async function cadastroCategoriaController(tag: Tag, usuario_logado: number){
    try{
        cadastrar_tag(tag)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de Tag realizado")
    }catch(err){
        console.log("Erro", err)
    }
}