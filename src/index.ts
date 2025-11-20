import { cadastroUsuarioController } from "./Controller/Cadastros/cadastroUsuarioController";
import Usuario from "./Model/Usuario";
import cadastroContaController from "./Controller/Cadastros/cadastroContaController";


const usuario1: Usuario = {
    nome: "Elias Moreira",
    email: "elias@gmail.com",
    senha: "123456"
}
cadastroUsuarioController(usuario1, 1);

const conta1 = {
    nome: "Conta Nubank Corrente",
    descricao: "Conta corrente do Elias",
    titular: 2,
    saldoInicial: 1000
}
cadastroContaController(conta1, 1);