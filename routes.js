const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const pacientesController = require('./src/controllers/pacientesController');
const psicologoController = require('./src/controllers/psicologoController');
const {middlewareGlobal} = require('./src/middlewares/middleware');

// Rotas da principal
route.get('/', middlewareGlobal, homeController.paginaInicial);
route.post('/', middlewareGlobal, homeController.pesquisarEmail);
route.get('/cadastrar/usuario/:email?', middlewareGlobal, homeController.paginaCadastrar);
route.post('/acessar', middlewareGlobal, homeController.acessar);
route.post('/cadastrar', homeController.cadastrar);
route.get('/senha', middlewareGlobal, homeController.senhaInvalida)


route.get('/pacientes', middlewareGlobal, pacientesController.pacientes);

//Rotas de Psicologos
route.get('/psicologos',middlewareGlobal, psicologoController.psicologos);
route.get('/agendamentos/psicologo/:idPsicologo', middlewareGlobal, psicologoController.agendamentos);
route.post('/perfil/psicologo', middlewareGlobal, psicologoController.cadastrarPerfilPsicologo);

//Agendamento
route.get('/agendamentos/paciente/:idPaciente?/:psicologo?', middlewareGlobal, pacientesController.propostasAgendamentosComPaciente)
route.post('/confirmar/agendamento', middlewareGlobal, pacientesController.confirmarAgendamento) 
route.post('/perfil', middlewareGlobal, pacientesController.cadastrarPerfilPaciente)

route.get('/perfil/paciente/:id', middlewareGlobal, pacientesController.perfilPaciente)
route.get('/perfil/psicologo/:id', middlewareGlobal, psicologoController.perfilPsicologo)
 
route.get('/login/sair', homeController.logout);


/* Versão 2 
route.post('/agendamento/paciente', middlewareGlobal, pessoaController.agendarPaciente)
*/


module.exports = route;
