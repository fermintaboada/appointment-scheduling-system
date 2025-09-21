import{  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Status } from '../interfaces/appointmentInterface'
import { User } from './User.entity'

@Entity("appointments")
export class Appointment {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'date', nullable: false})
    date: Date

    @Column({type: "varchar", length: 5, nullable: false})
    time: string
    
    @ManyToOne(() => User, user => user.appointments, {nullable: false })
    user: User

    @Column({type: "varchar", length: 10, nullable: false, default: Status.active})
    status: Status

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
 