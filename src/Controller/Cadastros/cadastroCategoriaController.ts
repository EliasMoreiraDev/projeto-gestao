import Categorias from "../../Model/Categoria"
import { cadastrar_categoria} from "../../Repository/db"
import { cadastroLogController } from "./LogController"

export default async function cadastroCategoriaController(categoria: Categorias, usuario_logado: number){
    try{
        cadastrar_categoria(categoria)
        cadastroLogController(usuario_logado)
        console.log("Cadastro de categoria realizado")
    }catch(err){
        console.log("Erro", err)
    }
}