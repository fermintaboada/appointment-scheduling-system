import { userRegisterDTO} from "../DTO/UserDTO";
import { createCredential } from "./credentialService";
import { Credential } from "../entities/Credentials.entity";
import { appDataSource, UserModel} from "../config/data-source";
import { User } from "../entities/User.entity";


export const getUserService = async (): Promise<User[]> => {
    return await  UserModel.find()
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound: User | null = await UserModel.findOne({
        where: {id: id}, relations: ["appointments"]
    })
    if (!userFound) {
    throw new Error(`usuario con id ${id} no encontrado.`);
}
    return userFound
}

export const registerUserService = async(user: userRegisterDTO):Promise <User> => {
    const resultadoTrans =  appDataSource.transaction(async(entityManager)=>{
        const credential: Credential | undefined = await createCredential(entityManager,user.username, user.password) 
        const nuevoUsuario: User = entityManager.create(User,{
        birthdate:new Date(user.birthDate),
        email: user.email,
        name: user.name,
        nDni: user.nDni,
        credential:  credential
})
return await entityManager.save(nuevoUsuario)   
    })    
    return resultadoTrans   
}
