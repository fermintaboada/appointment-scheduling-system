"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const getUsersController = (req, res) => {
    res.status(200).json({
        msg: 'Obtener listado de todos los usuarios',
        data: []
    });
};
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => {
    res.status(200).json({
        msg: 'Obtener detalle de un usuario especifico.',
        data: {}
    });
};
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => {
    res.status(200).json({
        msg: 'Registro de un nuevo usuario.',
        data: req.body
    });
};
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => {
    res.status(200).json({
        msg: 'Login del usuario a la aplicacion.',
        data: req.body
    });
};
exports.loginUserController = loginUserController;
