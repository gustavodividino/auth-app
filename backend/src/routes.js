const { Router } = require('express')

const UserController = require('./controllers/UserController')

const routes = Router();

const validUser = (request, response, next) => {
    var token = request.header('auth');
    request.token = token;
    next();
};


routes.post('/auth', UserController.login);
routes.post('/logout', UserController.logout);

routes.post('/user', UserController.create);

routes.get('/user', validUser, UserController.index);

module.exports = routes;