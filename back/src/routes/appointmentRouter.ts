import { Request, Response, Router } from 'express';
import { getAppointmentsController, getAppointmentByIdController, scheduleAppointmentController, cancelAppointmentController } from '../controllers/appointmentController';
import { scheduleAppointmentDTO } from '../DTO/AppointmentDTO';

const appointmentRouter: Router = Router();

appointmentRouter.get('/',(req: Request, res: Response) => getAppointmentsController(req, res));
appointmentRouter.get('/:id', (req: Request<{id:string}>, res: Response): void => getAppointmentByIdController(req, res));
appointmentRouter.post('/schedule',(req: Request <unknown, unknown, scheduleAppointmentDTO>, res: Response)=> scheduleAppointmentController(req, res));
appointmentRouter.put('/cancel/:id', (req: Request <{id: string}>, res: Response)=> cancelAppointmentController(req, res));

export default appointmentRouter;
