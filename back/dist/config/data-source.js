"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.UserModel = exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const User_entity_1 = require("../entities/User.entity");
const Credentials_entity_1 = require("../entities/Credentials.entity");
const Appointment_entity_1 = require("../entities/Appointment.entity");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.DB_HOST,
    port: env_1.DB_PORT,
    username: env_1.DB_USERNAME,
    password: env_1.DB_PASSWORD,
    database: env_1.DB_DATABASE,
    synchronize: env_1.DB_SYNCHRONIZE,
    dropSchema: env_1.DB_DROP,
    logging: env_1.DB_LOGGING,
    entities: [User_entity_1.User, Credentials_entity_1.Credential, Appointment_entity_1.Appointment],
});
exports.UserModel = exports.appDataSource.getRepository(User_entity_1.User);
exports.CredentialModel = exports.appDataSource.getRepository(Credentials_entity_1.Credential);
