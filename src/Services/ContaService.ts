import { cadastroLogController } from "../Controller/Cadastros/LogController";
import Conta from "../Model/Conta";
import { cadastrar_conta } from "../Repository/db";

async function ContaService(conta: Conta, usuarioLogadoId: number) {
        if(conta.saldoInicial < 0) {
            throw new Error("O saldo inicial não pode ser negativo.");
        }
        
        
        conta.dataCriacao = new Date();
        await cadastrar_conta(conta);

        await cadastroLogController(usuarioLogadoId, conta.nome);
    
}

export default ContaService;