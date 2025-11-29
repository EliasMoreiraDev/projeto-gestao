import TipoCategoria from "./enums/tipoCategoria";

export default interface Categorias{
    id?: number,
    nome:string,
    tipo: TipoCategoria,
    dataCriacao?: Date
}