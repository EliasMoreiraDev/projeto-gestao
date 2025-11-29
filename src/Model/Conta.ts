interface Conta {
    id?: number,
    nome: string,
    descricao: string,
    saldo: number,
    titular: number,
    dataCriacao?: Date
}

export default Conta;