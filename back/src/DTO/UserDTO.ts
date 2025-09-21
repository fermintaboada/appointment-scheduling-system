export interface userRegisterDTO {
    name: string;
    email: string;
    username: string;
    birthDate: Date;
    nDni: number;
    password: string
}

export interface userLoginDTO {
    username: string;
    password: string
}

export interface userInfoDTO {
    name: string,
    email: string,
    username ?: string,
}