import { cadastroLogController, deleteLogController } from "../Controller/LogController";
import Tag from "../Model/Tag";
import { cadastrar_tag, delete_tag, listar_todas_tags } from "../Repository/db";


export async function CadastrarTagService(tag: Tag, usuarioLogadoId: number) {
    
    if(tag.nome.length > 15) {
        return console.log("O nome da tag deve ter no máximo 15 caracteres.");
    }
    
    await cadastrar_tag(tag);
    
    await cadastroLogController(usuarioLogadoId, tag.nome);
}
export async function ListarTagService() {
        
        return await listar_todas_tags()
}
export async function DeletarTagService(idTag: number, usuarioLogadoId: number) {
        const tagUsadaTransacao = await listar_todas_tags();
        if(!tagUsadaTransacao.find(tag => tag.id === idTag)){
            return console.log("Tag não encontrada.");
        }
        await delete_tag(idTag);
        await deleteLogController(usuarioLogadoId);
    
}