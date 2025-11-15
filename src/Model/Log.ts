export default interface Log{
    id?: number,
    usuarioId: number,
    acao: string,
    detalhes: string,
    dataHora: Date
}