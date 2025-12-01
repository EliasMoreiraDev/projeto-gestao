import { cadastroLogController, deleteLogController } from "../Controller/LogController";
import Conta from "../Model/Conta";
import { cadastrar_conta, delete_conta, listar_contas_por_usuario_id, listar_todas_contas, listar_todas_transacoes } from "../Repository/db";

export async function CadastrarContaService(conta: Conta, usuarioLogadoId: number) {
        if(conta.saldo < 0) {
            return console.log("O saldo inicial não pode ser negativo.");
        }
        
        
        conta.dataCriacao = new Date();
        await cadastrar_conta(conta);

        await cadastroLogController(usuarioLogadoId, conta.nome);
    
}
export async function DeletarContaService(idConta: number, usuarioLogadoId: number) {
        
    const conta = await listar_todas_contas();
    const contaUsadaTransacao = await listar_todas_transacoes();

    if(!conta.find(c => c.id === idConta)){
        return console.log("Conta não encontrada.");
    }else if(contaUsadaTransacao.find(transacao => transacao.contaId === idConta)) {
        return console.log("Não é possível deletar uma conta que está sendo usada em uma transação.");
    }
    await delete_conta(idConta);
    await deleteLogController(usuarioLogadoId);

}
export async function ListarContaUsuarioService(usuarioId: number) {

    const contasUsuario = await listar_contas_por_usuario_id(usuarioId);
    if (!contasUsuario) {
        return console.log("Nenhuma conta encontrada para este usuário.");
    }
    return contasUsuario;
}