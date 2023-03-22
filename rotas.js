const { Router } = require('express');

const controleAutores = require('./conttroladores/autor');
const controleTarefas = require("./conttroladores/tarefa");

const rotas = new Router();

rotas.route('/autores')
   .get(controleAutores.getAutores)
   .post(controleAutores.addAutor)
   .put(controleAutores.updateAutor)

rotas.route('/autores/:codigo')
   .get(controleAutores.getAutorPorCodigo)
   .delete(controleAutores.deleteAutor)


rotas.route('/tarefas')
     .get(controleTarefas.getTarefas)
     .post(controleTarefas.addTarefa)
     .put(controleTarefas.updateTarefa)

rotas.route('/tarefas/:codigo')
     .delete(controleTarefas.deleteTarefa)

module.exports = rotas;