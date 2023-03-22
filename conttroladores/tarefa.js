const { pool } = require('../config');

const getTarefas = (request, response) => {
    pool.query(`select t.codigo as codigo, t.nome as nome, 
    t.descricao as descricao,
    t.codigo_autor as autor
    from tarefa t
    join autor a on t.codigo_autor = a.codigo
    order by t.codigo`,
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao consultar a tabela tarefas: ' + error
                    }
                )
            }
            response.status(200).json(results.rows);
        }
    )
}

const addTarefa = (request, response) => {
    const { codigo, nome, descricao, codigo_autor } = request.body;
    pool.query(`insert into tarefa (codigo, nome, descricao, codigo_autor) 
    values ($1, $2, $3, $4)
    returning codigo, nome, descricao, codigo_autor`,
        [codigo, nome, descricao, codigo_autor],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao inserir a tarefa: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'tarefa adicionada',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const updateTarefa = (request, response) => {
    const {codigo, nome, descricao, codigo_autor} = request.body;
    pool.query(`UPDATE tarefa
	SET nome=$1, descricao=$2, codigo_autor=$3
	WHERE codigo=$5
    returning codigo, nome, descricao, codigo_autor`,
        [nome, descricao, codigo_autor, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao atualizar dados da tarefa: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'tarefa atualizada',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const deleteTarefa = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM tarefa where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao remover tarefa: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'tarefa removida'
                }
            );
        }
    )
}

module.exports = {
    getTarefas, addTarefa, updateTarefa, deleteTarefa
}