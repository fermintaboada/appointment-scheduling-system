"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const getAppointments = (req, res) => {
    res.send('Obtener listado de todos los turnos');
};
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => {
    res.send(`Obtener detalle del turno con id ${req.params.id}`);
};
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => {
    res.send('Agendar un nuevo turno');
};
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => {
    res.send('Cambiar el estatus de un turno a cancelled');
};
exports.cancelAppointment = cancelAppointment;
