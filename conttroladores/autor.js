const {pool} = require('../config');

const getAutores = (request, response) => {
    // para testar um tempo de para recuperar os registros
    // setTimeout(() => { console.log("Esperando para dar o retorno!");
    pool.query('SELECT * FROM autor ORDER BY codigo',
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao consultar a tabela autores: ' + error
                    }
                )
            }
            response.status(200).json(results.rows);
        }
    )
    //}, 3000);
}

const addAutor = (request, response) => {
    const {codigo, nome} = request.body;
    pool.query(`INSERT INTO autor (codigo, nome) 
    VALUES ($1, $2)
    RETURNING codigo, nome`,
        [codigo, nome],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao inserir o autor: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Autor criado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const updateAutor = (request, response) => {
    const {codigo, nome} = request.body;
    pool.query(`UPDATE autor SET nome=$1
    WHERE codigo = $2
    RETURNING codigo, nome`,
        [nome, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao atualizar o autor: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Autor atualizado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const deleteAutor = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM autor where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao remover o autor: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'autor removido'
                }
            );
        }
    )
}

const getAutorPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM autor where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao recuperar o autor: ' + error
                    }
                )
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

module.exports = {
    getAutores, addAutor, updateAutor, deleteAutor, getAutorPorCodigo
}