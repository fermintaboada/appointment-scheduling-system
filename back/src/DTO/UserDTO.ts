export interface userRegisterDTO {
    name: string;
    username: string;
    birthDate: Date;
    password: string
}

export interface userLoginDTO {
    username: string;
    password: string
}