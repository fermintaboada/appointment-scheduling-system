import { appDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/appointmentInterface";

export const AppointmentModel = appDataSource.getRepository(Appointment).extend({

validateAllowAppointment: function (date: Date, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes, 0);
    const today = new Date();

    const appointmentDateArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
    const nowArg = new Date(today.getTime() - 3 * 60 * 60 * 1000);

    if (appointmentDateArg < nowArg) {
    throw new Error("No se pueden crear citas para fechas pasadas");
    }

    const diffMilliSeconds = appointmentDateArg.getTime() - nowArg.getTime();
    const diffHours = diffMilliSeconds / (1000 * 60 * 60);

    if (diffHours < 24) {
    throw new Error("Las citas deben agendarse con más de 24 horas de antelación");
    }

    const dayOfWeek = appointmentDateArg.getUTCDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
    throw new Error("No se pueden agendar citas los fines de semana");
    }

    if (hours < 8 || hours > 17) {
    throw new Error("Las citas deben agendarse entre las 08:00 y 18:00");
    }
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
