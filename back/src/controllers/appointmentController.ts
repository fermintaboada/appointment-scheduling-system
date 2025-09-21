import { Request, Response } from 'express';
import { scheduleAppointmentDTO } from '../DTO/AppointmentDTO';
import {cancelStatusAppService, getAppByIdService, getAppService, registerAppService} from '../services/appointmentService';

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
        msg: 'Obtener listado de todos los turnos',
        data: await getAppService()
    })    
    } catch (error) {
        res.status(404).json({
        msg: error instanceof Error ? error.message : 'Error inesperado',
    })    
    }
};

export const getAppointmentByIdController = async (req: Request<{id:string}>, res: Response): Promise<void> => {
    try {
        res.status(200).json({
        msg: 'Obtener un turno por ID',
        data: await getAppByIdService(parseInt(req.params.id,10))
    })    
    } catch (error) {
        res.status(404).json({
        msg: error instanceof Error ? error.message : 'Error desconocido',
    })    
    }
};


export const scheduleAppointmentController = async (req: Request<unknown, unknown, scheduleAppointmentDTO>, res: Response): Promise<void> => {
    try {
        res.status(201).json({
        msg: 'crear un nuevo turno',
        data: await registerAppService(req.body)
    })    
    } catch (error) {
        res.status(400).json({
        msg: error instanceof Error ? error.message : 'Error inesperado',
    })    
    }
};

export const cancelAppointmentController = async(req: Request<{id:string}>, res: Response): Promise<void> => {
    try {
        res.status(200).json({
        msg: 'Cambiar el estatus de un turno a "cancelled"',
        data: await cancelStatusAppService(parseInt(req.params.id,10))
    })    
    } catch (error) {
        res.status(404).json({
        msg: error instanceof Error ? error.message : 'Error inesperado',
    })    
    }
}

