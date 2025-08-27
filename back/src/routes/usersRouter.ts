import {Request, Response, Router } from 'express';
import { getUsersController, getUserByIdController, registerUserController, loginUserController } from '../controllers/usersController';
import { userRegisterDTO } from '../DTO/UserDTO';
import { userLoginDTO } from '../DTO/UserDTO';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) => getUsersController(req, res));
userRouter.get('/:id', (req:Request<{id:string}>, res: Response): void => getUserByIdController(req, res));

userRouter.post('/register',(req: Request<unknown, unknown, userRegisterDTO>, res: Response)=> registerUserController(req, res));
userRouter.post('/login', (req: Request<unknown, unknown, userLoginDTO>, res: Response)=> loginUserController (req, res));

export default userRouter;
