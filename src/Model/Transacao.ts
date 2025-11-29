import tipoCategoria from "./enums/tipoCategoria";

interface Transacao {
    id?: number,
    descricao: string,
    valor: number,
    dataTransacao: Date,
    tipo: tipoCategoria,
    categoriaId: number,
    contaId: number,
    tags: string[]
}

export default Transacao;