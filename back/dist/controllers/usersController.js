"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const data_source_1 = require("../config/data-source");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msg: 'Obtener listado de todos los usuarios',
            data: yield (0, userService_1.getUserService)()
        });
    }
    catch (error) {
        res.status(500).json({
            msg: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(yield (0, userService_1.getUserByIdService)(parseInt(req.params.id, 10)));
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({
            msg: 'Registro de un nuevo usuario.',
            data: yield (0, userService_1.registerUserService)(req.body)
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido"
        });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentialId = yield (0, credentialService_1.loginUser)(req.body.username, req.body.password);
        const userFound = yield data_source_1.UserModel.findOne({
            where: {
                credential: {
                    id: credentialId
                }
            }
        });
        res.status(200).json({
            login: true,
            user: userFound
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido"
        });
    }
});
exports.loginUserController = loginUserController;
