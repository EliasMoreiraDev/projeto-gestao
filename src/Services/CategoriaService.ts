import { cadastroLogController } from "../Controller/LogController";
import Categorias from "../Model/Categoria";
import { cadastrar_categoria, delete_categoria, listar_todas_categorias, listar_todas_transacoes } from "../Repository/db";

export async function CadastroCategoriaService(categoria: Categorias, usuarioLogadoId: number) {
        if(categoria.nome.length < 25) {
            return console.log("O nome da cetegoria podeter no máximo 20 caracteres");
        }
        
        
        categoria.dataCriacao = new Date();
        await cadastrar_categoria(categoria);

        await cadastroLogController(usuarioLogadoId, categoria.nome);
    
}
export async function DeletarCategoriaService(idCategoria: number, usuarioLogadoId: number) {
        const categoriaUsadaTransacao = await listar_todas_transacoes();
        const categoria = await listar_todas_categorias();
        if(!categoria.find(cat => cat.id === idCategoria)){
            return console.log("Categoria não encontrada.");
        }else if(categoriaUsadaTransacao.find(transacao => transacao.categoriaId === idCategoria)) {
            return console.log("Não é possível deletar uma categoria que está sendo usada em uma transação.");
        }
        
        await delete_categoria(idCategoria);

        await cadastroLogController(usuarioLogadoId);
    
}
export async function ListarCategoriaService() {
        
        await listar_todas_categorias()
    
}