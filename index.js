const express = require('express');
const cors = require('cors');
const rotas = require('./rotas');

///const { pool } = require('./config');
///const { addAutor, updateAutor, deleteAutor, getAutorPorCodigo } = require('./conttroladores/autor');
///const { getTarefas, addTarefa, updateTarefa } = require('./conttroladores/tarefa');
///const { login, verificaJWT } = require('./conttroladores/seguranca');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(rotas);

///const getAutores = (request, response) => {
    // para testar um tempo de para recuperar os registros
    // setTimeout(() => { console.log("Esperando para dar o retorno!");
   ////pool.query('SELECT * FROM autor ORDER BY codigo',
        ///(error, results) => {
            ///if (error) {
               /// return response.status(400).json(
                    ///{
                        ///status: 'error',
                        ///message: 'Erro ao consultar a tabela autor: ' + error
                    ///}
                ///)
         ///}
            ///response.status(200).json(results.rows);
        ///}
    ///)
    //}, 3000);
///}

///const addAutores = (request, response) => {
    ///const {codigo, nome } = request.body;
    ///pool.query(`INSERT INTO autor (codigo, nome) 
    ///VALUES ($1, $2)
    ///RETURNING codigo, nome`,
       ///[codigo, nome],
        ///(error, results) => {
            ///if (error) {
                ///return response.status(400).json(
                    ///{
                       ///status: 'error',
                       /// message: 'Erro ao inserir o autor: ' + error
                    ///}
                ///)
            ///}
           /// response.status(200).json(
                ///{
                    ///status: 'success', message: 'autor criado',
                    ///objeto: results.rows[0]
                ///}
            ///);
        ///}
    ///)
///}


///app.route('/autores')
    ///.get(getAutores)
    ///.post(addAutor)
    ///.put(updateAutor)

///app.route('autores/:codigo')
    ///.get(getAutorPorCodigo)
    ///.delete(deleteAutor)


///app.route('/tarefas')
    ///.get(getTarefas)
    ///.post(addTarefa)
    ///.put(updateTarefa)

///app.route('/login')
    ///.post(login)

///app.route('verifica')
    ///.post(verificaJWT)

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor da API rodando')
})