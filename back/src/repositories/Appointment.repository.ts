import { appDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/appointmentInterface";
import { validateAppointmentRules } from "../helpers/appointmentValidations";

export const AppointmentModel = appDataSource.getRepository(Appointment).extend({

    validateAllowAppointment: function (date: Date, time: string) {
        validateAppointmentRules(date, time);
    },

    validateExistingApp: async function (userId: number, date: Date, time: string): Promise<void> {
const appFound = await this.findOne({
    where: {
    user: {
        id: userId,
    },
    time: time,
    date: date,
    status: Status.active,
    },
})
if (appFound) throw new Error( `La cita para el usuario con Id: ${userId} con fecha ${date} y hora ${time} ya existe y se encuentra activa`)
    
} 

});
