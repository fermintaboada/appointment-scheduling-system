"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./config/data-source");
const env_1 = require("./config/env");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
data_source_1.appDataSource.initialize()
    .then(() => {
    console.log("Conexion a la DB exitosa");
    server_1.default.listen(env_1.PORT, () => {
        console.log('Iniciando...');
        console.log(`Servidor corriendo en el puerto ${env_1.PORT}`);
    });
})
    .catch((err) => console.log(err.message));
