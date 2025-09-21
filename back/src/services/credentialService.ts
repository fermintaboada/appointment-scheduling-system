import { Credential } from "../entities/Credentials.entity";
import { EntityManager } from "typeorm";
import { CredentialModel } from "../config/data-source";
 

const crypPass = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

//const checkUserExists: (username: string) => void = (username: string): void => {
//    const usernameFound: ICredential | undefined = credentials.find(cred => cred.username === username)
//    if(usernameFound) throw new Error(`El usuarrio con username: ${username} ya existe, intente con otro username.`)
    
//}

export const createCredential = async(entityManager: EntityManager, username: string, password: string):Promise <Credential | undefined> => {
        const passCript = await crypPass(password)
        const nuevaCredencial = entityManager.create(Credential, {
        username: username,
        password: passCript
    })
    return await entityManager.save(nuevaCredencial)
            
}


export const loginUser = async (username: string, password: string): Promise<number | undefined> => {
    
    const cripPass = await crypPass(password)
    const credentialFound = await CredentialModel.findOne({
        where: {username}
    })
    if(credentialFound?.password === cripPass)return credentialFound.id
    throw new Error ("Credenciales incorrectas")      
    
}




