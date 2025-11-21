import { cadastroUsuarioController } from "./Controller/Cadastros/cadastroUsuarioController";
import Usuario from "./Model/Usuario";
import cadastroContaController from "./Controller/Cadastros/cadastroContaController";
import deleteUsuarioController from "./Controller/Delete/deleteUsuarioController";
import deleteContaController from "./Controller/Delete/deleteContaController";
import Tag from "./Model/Tag";
import { cadastroTagController } from "./Controller/Cadastros/cadastroTagController";


const usuario1: Usuario = {
    nome: "Elias Moreira",
    email: "elias@gmail.com",
    senha: "123456"
}


//cadastroUsuarioController(usuario1, 1);
//deleteUsuarioController(2, 1)

const conta1 = {
    nome: "Conta Nubank Corrente",
    descricao: "Conta corrente do Elias",
    titular: 2,
    saldoInicial: 1000
}
//cadastroContaController(conta1, 1);
//deleteContaController(1, 2)

const tag1: Tag = {
    nome: "Viagem de Natal"
}
cadastroTagController(tag1, 1)