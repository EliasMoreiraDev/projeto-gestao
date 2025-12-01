import sqlite3 from "sqlite3";
import { open } from "sqlite";
import Tag from "../Model/Tag";
import Transacao from "../Model/Transacao";
import TransacaoTag from "../Model/TransacaoTag";
import Usuario from "../Model/Usuario";
import Log from "../Model/Log";
import Categorias from "../Model/Categoria";
import Conta from "../Model/Conta";

export const dbPromisse = open({
    filename: "database.sqlite",
    driver: sqlite3.Database
})

export async function dbInit() {
    const db = await dbPromisse;
    await db.exec(
        `
        PRAGMA foreign_keys = ON;

        CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        acao TEXT NOT NULL, 
        detalhes TEXT,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );


        CREATE TABLE categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('Receita', 'Despesa')),
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE contas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        usuario_id INTEGER NOT NULL,
        saldo_inicial REAL NOT NULL DEFAULT 0.00,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );

        CREATE TABLE transacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        data DATETIME NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('Receita', 'Despesa')),
        categoria_id INTEGER NOT NULL,
        conta_id INTEGER NOT NULL,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
        FOREIGN KEY (conta_id) REFERENCES contas(id)
        );

        CREATE TABLE tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL
        );

        CREATE TABLE transacoes_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transacao_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        FOREIGN KEY (transacao_id) REFERENCES transacoes(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
        );

        insert into usuarios (nome, email, senha) values ('Admin', 'admin@admin', 'admin123');
        `
    );
}

export async function cadastrar_tag(tag: Tag){
    const db = await dbPromisse
    await db.run(
        "insert into tags (nome) values (?)",
        tag.nome
    )
}

export async function cadastrar_transacao(transacao: Transacao){
    const db = await dbPromisse
    await db.run(
        "insert into transacoes (descricao,valor,data,tipo,categoria_id,conta_id) values (?,?,?,?,?,?)",
        transacao.descricao,transacao.valor,transacao.dataTransacao,transacao.tipo,transacao.categoriaId,transacao.contaId
    )
}

export async function cadastrar_transacaoTag(transacaoTags: TransacaoTag){
    const db = await dbPromisse
    await db.run(
        "insert into transacoes_tags (transacao_id, tag_id) values (?,?)",
        transacaoTags.transacaoId, transacaoTags.tagId
    )
}

export async function cadastrar_usuario(usuario: Usuario){
    const db = await dbPromisse
    await db.run(
        "insert into usuarios (nome,email,senha) values (?,?,?)",
        usuario.nome, usuario.email,usuario.senha
    )
}

export async function cadastrar_log(log: Log) {
    const db = await dbPromisse;
    await db.run(
        "INSERT INTO logs (usuario_id, acao, detalhes) VALUES (?, ?, ?)",
        log.usuarioId, log.acao, log.detalhes
    );
}

export async function cadastrar_categoria(categoria: Categorias) {
    const db = await dbPromisse;
    await db.run(
        "INSERT INTO categorias (nome, tipo) VALUES (?, ?)",
        categoria.nome, categoria.tipo
    );
}

export async function cadastrar_conta(conta: Conta) {
    const db = await dbPromisse;
    await db.run(
        "INSERT INTO contas (nome, descricao, usuario_id, saldo_inicial) VALUES (?, ?, ?, ?)",
        conta.nome, conta.descricao, conta.titular, conta.saldo
    );
}


export async function update_categoria(id: number, nome: string, tipo: string) {
    const db = await dbPromisse;
    await db.run(
        "UPDATE categorias SET nome = ?, tipo = ? WHERE id = ?;",
        nome, tipo, id
    );
}

export async function update_conta(id: number, nome: string, descricao: string, saldoInicial: number) {
    const db = await dbPromisse;
    await db.run(
        "UPDATE contas SET nome = ?, descricao = ?, saldo_inicial = ? WHERE id = ?;",
        nome, descricao, saldoInicial, id
    );
}

export async function update_usuario(idUsuario: number, nome: string, email: string) {
    const db = await dbPromisse;
    await db.run(
        "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?;",
        nome, email, idUsuario
    );
}

    
export async function delete_tag(tag: number){
    const db = await dbPromisse
    await db.run(
        "DELETE FROM tags WHERE id = ?;",
        tag
    )
}

export async function delete_usuario(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM usuarios WHERE id = ?;",
        id
    );
}

export async function delete_log(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM logs WHERE id = ?;",
        id
    );
}

export async function delete_categoria(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM categorias WHERE id = ?;",
        id
    );
}

export async function delete_conta(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM contas WHERE id = ?;",
        id
    );
}

export async function delete_transacao(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM transacoes WHERE id = ?;",
        id
    );
}

export async function delete_transacaoTag(id: number | undefined) {
    const db = await dbPromisse;
    await db.run(
        "DELETE FROM transacoes_tags WHERE id = ?;",
        id
    );
}
export async function listar_todos_usuarios(): Promise<Usuario[]> {
    const db = await dbPromisse;
    return db.all<Usuario[]>("SELECT * FROM usuarios");
}

export async function listar_todos_logs() { 
    const db = await dbPromisse;
    return db.all<Log[]>("SELECT * FROM logs ORDER BY data_hora DESC");
}

export async function listar_todas_categorias() { 
    const db = await dbPromisse;
    return db.all<Categorias[]>("SELECT * FROM categorias");
}

export async function listar_todas_contas() {
    const db = await dbPromisse;
    return db.all<Conta[]>("SELECT * FROM contas");
}

export async function listar_todas_transacoes(): Promise<Transacao[]> {
    const db = await dbPromisse;
    return db.all<Transacao[]>("SELECT * FROM transacoes");
}

export async function listar_todas_tags(): Promise<Tag[]> {
    const db = await dbPromisse;
    return db.all<Tag[]>("SELECT * FROM tags");
}

export async function listar_todas_transacoes_tags(): Promise<TransacaoTag[]> {
    const db = await dbPromisse;
    return db.all<TransacaoTag[]>("SELECT * FROM transacoes_tags");
}
export async function listar_categoria_por_id(id: number): Promise<Categorias | undefined> {
    const db = await dbPromisse;
    return db.get<Categorias>("SELECT * FROM categorias WHERE id = ?", id);
}
export async function listar_contas_por_usuario_id(id: number): Promise<Conta[] | undefined> {
    const db = await dbPromisse;
    return db.all<Conta[]>("SELECT * FROM contas WHERE usuario_id = ?", id);
}
export async function listar_transacoes_por_usuario_id(usuarioId: number): Promise<Transacao[] | undefined> {
    const db = await dbPromisse;
    return db.all<Transacao[]>(
        `SELECT t.* FROM transacoes t
         JOIN contas c ON t.conta_id = c.id
         WHERE c.usuario_id = ?`,
        usuarioId
    );
}

export async function listar_usuario_por_id(id: number): Promise<Usuario | undefined> {
    const db = await dbPromisse;
    return db.get<Usuario>("SELECT * FROM usuarios WHERE id = ?", id);
}

export async function listar_usuario_por_email(email: string): Promise<Usuario | undefined> {
    const db = await dbPromisse;
    return db.get<Usuario>("SELECT * FROM usuarios WHERE email = ?", email);
}