import TipoGasto from "./enums/tipoCategoria";

export default interface Categorias{
    id?: number,
    nome:string,
    tipo: TipoGasto
    dataCriacao: Date
}