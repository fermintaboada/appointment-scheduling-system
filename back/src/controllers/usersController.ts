import { Request,  Response } from 'express';
import { userRegisterDTO } from '../DTO/UserDTO';
import { userLoginDTO } from '../DTO/UserDTO';
import { getUserByIdService, getUserService, registerUserService } from '../services/userService';
import { PostgresError } from '../interfaces/ErrorInterface';
import { loginUser } from '../services/credentialService';
import { UserModel } from '../config/data-source';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
        msg:'Obtener listado de todos los usuarios',
        data: await getUserService()
})
    } catch (error) {
        res.status(500).json({
        msg: error instanceof Error ? error.message : 'Error desconocido',
    })
    }    
};

export const getUserByIdController = async (req: Request<{id: string}>, res: Response):Promise<void> => {
    try {
    res.status(200).json(
    await getUserByIdService(parseInt(req.params.id, 10))
    );
    } catch (error) {
    res.status(404).json({
        msg: error instanceof Error ? error.message : 'Error desconocido',
    });
    }
};

export const registerUserController = async (req: Request<unknown,unknown,userRegisterDTO>, res: Response) => {
    try {
    res.status(201).json({
        msg:'Registro de un nuevo usuario.',
        data: await registerUserService(req.body)
    });
} catch (error) {
    const err = error as PostgresError
    res.status(400).json({
        msg: err instanceof Error ? err.detail ? err.detail : err.message :  "Error desconocido"
    });
}
};

export const loginUserController = async (req: Request<unknown,unknown, userLoginDTO>, res: Response): Promise<void> => {
    try {
    const credentialId = await loginUser(req.body.username, req.body.password)
    const userFound = await UserModel.findOne({
    where: {
    credential: {
        id: credentialId
        }
    }
})

res.status(200).json({
    login: true,
    user: userFound
    })
} catch (error) {
    const err = error as PostgresError
    res.status(400).json({
    msg: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido"
    })
}
}