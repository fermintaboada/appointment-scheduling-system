import { Request,  Response } from 'express';
import { userRegisterDTO } from '../DTO/UserDTO';
import { userLoginDTO } from '../DTO/UserDTO';

export const getUsersController = (req: Request, res: Response) => {
    res.status(200).json({
        msg:'Obtener listado de todos los usuarios',
        data: []
});
    
};

export const getUserByIdController = (req: Request<{id: string}>, res: Response) => {
    res.status(200).json({
        msg:'Obtener detalle de un usuario especifico.',
        data: {}
});
    
};

export const registerUserController = (req: Request<unknown,unknown,userRegisterDTO>, res: Response) => {
    res.status(200).json({
        msg:'Registro de un nuevo usuario.',
        data: req.body 
});
    
};

export const loginUserController =  (req: Request<unknown,unknown, userLoginDTO>, res: Response) => {
    res.status(200).json({
        msg:'Login del usuario a la aplicacion.',
        data: req.body 
});
    
};