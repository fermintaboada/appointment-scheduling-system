"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const env_1 = require("./config/env");
server_1.default.listen(env_1.PORT, () => {
    console.log('Iniciando...');
    console.log(`Servidor corriendo en el puerto ${env_1.PORT}`);
});
