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
exports.AppointmentModel = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
const appointmentInterface_1 = require("../interfaces/appointmentInterface");
exports.AppointmentModel = data_source_1.appDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const today = new Date();
        const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowArg = new Date(today.getTime() - 3 * 60 * 60 * 1000);
        // No permitir fechas pasadas
        if (appointmentDateArg < nowArg) {
            throw new Error("No se pueden crear citas para fechas pasadas");
        }
        // Diferencia de horas con la fecha actual
        const diffMilliSeconds = appointmentDateArg.getTime() - nowArg.getTime();
        const diffHours = diffMilliSeconds / (1000 * 60 * 60);
        if (diffHours < 24) {
            throw new Error("Las citas deben agendarse con más de 24 horas de antelación");
        }
        // Validar fines de semana
        const dayOfWeek = appointmentDateArg.getUTCDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            throw new Error("No se pueden agendar citas los fines de semana");
        }
        // Validar horario laboral chequear para hacer que se agende 18:00 inclusive
        //if(hours >= 18 && minutes > 0) throw new Error("Las citas deben agendarse entre las 08:00 y 18:00")
        if (hours < 8 || hours > 17) {
            throw new Error("Las citas deben agendarse entre las 08:00 y 18:00");
        }
    },
    validateExistingApp: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appFound = yield this.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    time: time,
                    date: date,
                    status: appointmentInterface_1.Status.active,
                },
            });
            if (appFound)
                throw new Error(`La cita para el usuario con Id: ${userId} con fecha ${date} y hora ${time} ya existe y se encuentra activa`);
        });
    }
});
