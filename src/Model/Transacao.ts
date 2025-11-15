import tipoCategoria from "./enums/tipoCategoria";

interface Transacao {
    id: number,
    descricao: string,
    valor: number,
    data: Date,
    tipo: tipoCategoria,
    categoriaId: number,
    contaId: number
}

export default Transacao;