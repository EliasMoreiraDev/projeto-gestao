interface Conta {
    id?: number,
    nome: string,
    descricao: string,
    saldoInicial: number,
    titular: number,
    dataCriacao?: Date
}

export default Conta;