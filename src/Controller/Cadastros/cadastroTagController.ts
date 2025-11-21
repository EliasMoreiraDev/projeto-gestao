import Tag from "../../Model/Tag"
import TagService from "../../Services/TagService"

export async function cadastroTagController(tag: Tag, usuario_logado: number){
    try{
        TagService(tag, usuario_logado)
        console.log("Cadastro de Tag realizado")
    }catch(err){
        console.log("Erro", err)
    }
}