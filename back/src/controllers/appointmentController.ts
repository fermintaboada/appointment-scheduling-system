import { Request, Response } from 'express';
import { scheduleAppointmentDTO } from '../DTO/AppointmentDTO';

export const getAppointmentsController = (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'Obtener listado de todos los turnos',
        data: [] 
    })
};

export const getAppointmentByIdController = (req: Request<{id:string}>, res: Response) => {
    res.status(200).json({
        msg: 'Obtener el detalle de un turno especifico',
        data: [] 
    })
};


export const scheduleAppointmentController = (req: Request<unknown, unknown, scheduleAppointmentDTO>, res: Response) => {
    res.status(200).json({
        msg: 'Agendar un nuevo turno',
        data: [] 
    })
};

export const cancelAppointmentController = (req: Request<{id:string}>, res: Response) => {
    res.status(200).json({
        msg: 'Cambiar el estatus de turno a “cancelled” ',
        data: [] 
    })
};
