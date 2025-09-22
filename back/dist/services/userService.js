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
exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.UserModel.find();
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({
        where: { id: id }, relations: ["appointments"]
    });
    if (!userFound) {
        throw new Error(`usuario con id ${id} no encontrado.`);
    }
    return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const resultadoTrans = data_source_1.appDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const credential = yield (0, credentialService_1.createCredential)(entityManager, user.username, user.password);
        const nuevoUsuario = entityManager.create(User_entity_1.User, {
            birthDate: new Date(user.birthDate),
            email: user.email,
            name: user.name,
            nDni: user.nDni,
            credential: credential
        });
        return yield entityManager.save(nuevoUsuario);
    }));
    return resultadoTrans;
});
exports.registerUserService = registerUserService;
