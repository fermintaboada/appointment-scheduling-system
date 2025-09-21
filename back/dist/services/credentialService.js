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
exports.loginUser = exports.createCredential = void 0;
const Credentials_entity_1 = require("../entities/Credentials.entity");
const data_source_1 = require("../config/data-source");
const crypPass = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = yield crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
});
//const checkUserExists: (username: string) => void = (username: string): void => {
//    const usernameFound: ICredential | undefined = credentials.find(cred => cred.username === username)
//    if(usernameFound) throw new Error(`El usuarrio con username: ${username} ya existe, intente con otro username.`)
//}
const createCredential = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const passCript = yield crypPass(password);
    const nuevaCredencial = entityManager.create(Credentials_entity_1.Credential, {
        username: username,
        password: passCript
    });
    return yield entityManager.save(nuevaCredencial);
});
exports.createCredential = createCredential;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const cripPass = yield crypPass(password);
    const credentialFound = yield data_source_1.CredentialModel.findOne({
        where: { username }
    });
    if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) === cripPass)
        return credentialFound.id;
    throw new Error("Credenciales incorrectas");
});
exports.loginUser = loginUser;
