"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const getAppointmentsController = (req, res) => {
    res.status(200).json({
        msg: 'Obtener listado de todos los turnos',
        data: []
    });
};
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => {
    res.status(200).json({
        msg: 'Obtener el detalle de un turno especifico',
        data: []
    });
};
exports.getAppointmentByIdController = getAppointmentByIdController;
const scheduleAppointmentController = (req, res) => {
    res.status(200).json({
        msg: 'Agendar un nuevo turno',
        data: []
    });
};
exports.scheduleAppointmentController = scheduleAppointmentController;
const cancelAppointmentController = (req, res) => {
    res.status(200).json({
        msg: 'Cambiar el estatus de turno a “cancelled” ',
        data: []
    });
};
exports.cancelAppointmentController = cancelAppointmentController;
