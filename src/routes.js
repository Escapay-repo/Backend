import { Router } from 'express';
import TabelaController from './controllers/TabelaController.js';
import SessionController from './controllers/SessionController.js';
import AuthMiddleware from './middlewares/authMiddleware.js';
import MaquininhaController from './controllers/MaquininhaController.js';
import cors from 'cors';

const routes = new Router();
// Rotas protegidas por JWT
routes.use(AuthMiddleware.authenticateToken);

routes.post('/tabelas', TabelaController.tabelaCreate)
routes.get('/tabelas', TabelaController.tabelaIndex);
routes.get('/tabelas/:_id', TabelaController.tabelaId)
routes.put('/tabelas/update/:key', TabelaController.tabelaUpdate)
routes.delete('/tabelas/delete/:_id', TabelaController.tabelaDestroy)

routes.post('/maquininha', MaquininhaController.maquininhaCreate)
routes.get('/maquininha', MaquininhaController.maquininhaIndex);
routes.get('/maquininha/:_id', MaquininhaController.maquininhaId)
routes.put('/maquininha/update/:key', MaquininhaController.maquininhaUpdate)
routes.delete('/maquininha/delete/:_id', MaquininhaController.maquininhaDestroy)

routes.get('/simulado', TabelaController.tabelaAll);

routes.get('/users/me', AuthMiddleware.authenticateToken, SessionController.getUserDetails);
routes.post('/users/changePassword', SessionController.changePassword);
routes.post('/users/changeEmail', SessionController.changeEmail);

// rotas publicas:
routes.post('/users/register', SessionController.userCreate);
routes.post('/users/login', SessionController.userLogin);

// Rota de logout
routes.post('/users/logout', AuthMiddleware.authenticateToken, SessionController.userLogout);

// Rotas de dados do usuario
routes.get('/users/all', AuthMiddleware.authenticateToken, SessionController.getAllUsers);
routes.delete('/users/delete/:_id', AuthMiddleware.authenticateToken, SessionController.deleteUser);
routes.put('/users/toggleStatus/:_id', SessionController.toggleUserStatus);

routes.options('/users/me', cors());

export default routes