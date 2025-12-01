import { cadastroLogController, deleteLogController } from "../Controller/LogController";
import Transacao from "../Model/Transacao";
import { cadastrar_transacao, delete_transacao, delete_transacaoTag, listar_todas_transacoes_tags, listar_transacoes_por_usuario_id } from "../Repository/db";


export async function CadastrarTransacaoService(transacao: Transacao, usuarioLogadoId: number) {
    if (!transacao) return console.log("Dados da transação são obrigatórios.");

    if (transacao.descricao.length == 0) return console.log("A descrição da transação é obrigatória.");

    if (transacao.valor <= 0) {
        return console.log("O valor da transação deve ser um número maior que zero.");
    }
    await cadastrar_transacao(transacao);
    await cadastroLogController(usuarioLogadoId, `Transação ${transacao.descricao}`);

}
export async function ListarTransacaoUsuarioService(idUsuario: number) {
    
    const transacoesUsuario = await listar_transacoes_por_usuario_id(idUsuario);
    if (!transacoesUsuario) {
        return console.log("Nenhuma transação encontrada para este usuário.");
    }
    return transacoesUsuario;
}
export async function DeletarTransacaoService(idTransacao: number, usuarioLogadoId: number) {
    
    const transacaoTags = await listar_todas_transacoes_tags();
    if (transacaoTags.find(tt => tt.transacaoId === idTransacao)) {  
        await delete_transacaoTag(idTransacao);
    }  
    await delete_transacao(idTransacao);
    
    await deleteLogController(usuarioLogadoId);
}