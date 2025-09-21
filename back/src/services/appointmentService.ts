import { Status} from "../interfaces/appointmentInterface";
import { scheduleAppointmentDTO } from "../DTO/AppointmentDTO";
import { getUserByIdService } from "./userService"; 
import { Appointment } from "../entities/Appointment.entity";
import { AppointmentModel } from "../repositories/Appointment.repository";



export const getAppService = async ():Promise<Appointment[]> => {
    const appointmentsFound = await AppointmentModel.find()
    if(appointmentsFound.length > 0) return appointmentsFound 
    throw new Error("No hay turnos registrados.")
}

export const getAppByIdService = async(id: number): Promise <Appointment> => {
    const appFound: Appointment | null = await AppointmentModel.findOne({ where: { id: id } })
    if(!appFound) throw new Error("La cita con id ${id} no fue encontrada.")
    return appFound
}

export const registerAppService = async (app: scheduleAppointmentDTO):Promise < Appointment | undefined> => {
    await getUserByIdService(app.userId)
    AppointmentModel.validateAllowAppointment(app.date, app.time)
    await AppointmentModel.validateExistingApp(app.userId,app.date, app.time)
    const newApp: Appointment = AppointmentModel.create ( {
        date: app.date,
        time: app.time,
        user: { id: app.userId },
    })
    return await AppointmentModel.save(newApp)
}

export const cancelStatusAppService = async (id: number) => {
    const appFound: Appointment | null = await AppointmentModel.findOne({ where: { id: id } })
    if(!appFound) throw new Error("La cita con id ${id} no fue encontrada.") 
    appFound.status = Status.cancelled
    await AppointmentModel.save(appFound)
}





