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
exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msg: 'Obtener listado de todos los turnos',
            data: yield (0, appointmentService_1.getAppService)()
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : 'Error inesperado',
        });
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msg: 'Obtener un turno por ID',
            data: yield (0, appointmentService_1.getAppByIdService)(parseInt(req.params.id, 10))
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : 'Error inesperado',
        });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const scheduleAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({
            msg: 'crear un nuevo turno',
            data: yield (0, appointmentService_1.registerAppService)(req.body)
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error instanceof Error ? error.message : 'Error inesperado',
        });
    }
});
exports.scheduleAppointmentController = scheduleAppointmentController;
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msg: 'Cambiar el estatus de un turno a "cancelled"',
            data: yield (0, appointmentService_1.cancelStatusAppService)(parseInt(req.params.id, 10))
        });
    }
    catch (error) {
        res.status(404).json({
            msg: error instanceof Error ? error.message : 'Error inesperado',
        });
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
