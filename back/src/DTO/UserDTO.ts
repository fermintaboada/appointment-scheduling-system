export interface userRegisterDTO {
    name: string;
    email: string;
    username: string;
    birthDate: string;
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