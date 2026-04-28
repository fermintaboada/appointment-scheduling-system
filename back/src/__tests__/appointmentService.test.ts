import { Status } from '../interfaces/appointmentInterface';

// --- mocks (must be declared before importing the module under test) ---

const mockUser = { id: 1, name: 'Fermín', email: 'test@example.com' };
const mockAppointment = { id: 42, date: '2026-06-10', time: '10:00', status: Status.active };

jest.mock('../services/userService', () => ({
    getUserByIdService: jest.fn().mockResolvedValue(mockUser),
}));

jest.mock('../repositories/Appointment.repository', () => ({
    AppointmentModel: {
        validateAllowAppointment: jest.fn(),
        validateExistingApp: jest.fn().mockResolvedValue(undefined),
        create: jest.fn().mockReturnValue(mockAppointment),
        save: jest.fn().mockResolvedValue(mockAppointment),
        find: jest.fn().mockResolvedValue([mockAppointment]),
        findOne: jest.fn().mockResolvedValue(mockAppointment),
    },
}));

jest.mock('../services/emailService', () => ({
    sendAppointmentConfirmation: jest.fn().mockResolvedValue(undefined),
}));

import { getAppService, getAppByIdService, registerAppService, cancelStatusAppService } from '../services/appointmentService';
import { AppointmentModel } from '../repositories/Appointment.repository';
import { sendAppointmentConfirmation } from '../services/emailService';

// -----------------------------------------------------------------------

describe('appointmentService', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('getAppService', () => {
        it('devuelve la lista de turnos cuando hay registros', async () => {
            const result = await getAppService();
            expect(result).toEqual([mockAppointment]);
            expect(AppointmentModel.find).toHaveBeenCalledTimes(1);
        });

        it('lanza error cuando no hay turnos', async () => {
            (AppointmentModel.find as jest.Mock).mockResolvedValueOnce([]);
            await expect(getAppService()).rejects.toThrow('No hay turnos registrados');
        });
    });

    describe('getAppByIdService', () => {
        it('devuelve el turno cuando existe', async () => {
            const result = await getAppByIdService(42);
            expect(result).toEqual(mockAppointment);
        });

        it('lanza error cuando el turno no existe', async () => {
            (AppointmentModel.findOne as jest.Mock).mockResolvedValueOnce(null);
            await expect(getAppByIdService(99)).rejects.toThrow();
        });
    });

    describe('registerAppService', () => {
        const dto = { userId: 1, date: new Date('2026-06-10'), time: '10:00' };

        it('crea y guarda el turno correctamente', async () => {
            const result = await registerAppService(dto);
            expect(AppointmentModel.validateAllowAppointment).toHaveBeenCalledWith(dto.date, dto.time);
            expect(AppointmentModel.validateExistingApp).toHaveBeenCalledWith(dto.userId, dto.date, dto.time);
            expect(AppointmentModel.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockAppointment);
        });

        it('envía email de confirmación de forma no bloqueante', async () => {
            await registerAppService(dto);
            // Async — give the microtask queue a tick
            await Promise.resolve();
            expect(sendAppointmentConfirmation).toHaveBeenCalledWith(
                mockUser.email,
                mockUser.name,
                dto.date,
                dto.time,
                mockAppointment.id
            );
        });

        it('lanza error si la validación de fecha falla', async () => {
            (AppointmentModel.validateAllowAppointment as jest.Mock).mockImplementationOnce(() => {
                throw new Error('No se pueden crear citas para fechas pasadas');
            });
            await expect(registerAppService(dto)).rejects.toThrow('fechas pasadas');
        });

        it('lanza error si ya existe un turno duplicado', async () => {
            (AppointmentModel.validateExistingApp as jest.Mock).mockRejectedValueOnce(
                new Error('ya existe y se encuentra activa')
            );
            await expect(registerAppService(dto)).rejects.toThrow('ya existe');
        });
    });

    describe('cancelStatusAppService', () => {
        it('cambia el status a cancelled y guarda', async () => {
            const appointment = { ...mockAppointment, status: Status.active };
            (AppointmentModel.findOne as jest.Mock).mockResolvedValueOnce(appointment);

            await cancelStatusAppService(42);

            expect(appointment.status).toBe(Status.cancelled);
            expect(AppointmentModel.save).toHaveBeenCalledWith(appointment);
        });

        it('lanza error si el turno no existe', async () => {
            (AppointmentModel.findOne as jest.Mock).mockResolvedValueOnce(null);
            await expect(cancelStatusAppService(99)).rejects.toThrow();
        });
    });
});
