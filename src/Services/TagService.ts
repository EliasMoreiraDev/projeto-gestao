import { cadastroLogController } from "../Controller/Cadastros/LogController";
import Tag from "../Model/Tag";
import { cadastrar_tag } from "../Repository/db";


async function TagService(tag: Tag, usuarioLogadoId: number) {
    
    if(tag.nome.length < 15) {
        throw new Error("O nome da tag deve ter no máximo 15 caracteres.");
    }
    
    await cadastrar_tag(tag);
    
    await cadastroLogController(usuarioLogadoId, tag.nome);
}

export default TagService;