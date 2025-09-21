export interface IAppointment{
    id: number
    date: Date
    time: string
    userID: number
    status: Status
}

export enum Status{
    active = "active",
    cancelled = "cancelled"
}
