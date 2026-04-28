import { validateAppointmentRules } from '../helpers/appointmentValidations';

// Returns a Date that is `daysAhead` days from now, adjusted for the Argentina UTC-3 offset
// so the validation logic (which subtracts 3h internally) sees the right weekday/time.
function futureDate(daysAhead: number): Date {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d;
}

// Returns a monday that is at least `minDays` ahead (skips weekends)
function nextWeekday(minDays = 2): Date {
    const d = futureDate(minDays);
    while (d.getUTCDay() === 0 || d.getUTCDay() === 6) {
        d.setDate(d.getDate() + 1);
    }
    return d;
}

describe('validateAppointmentRules', () => {
    describe('horario válido', () => {
        it('acepta un turno en horario de negocio con suficiente anticipación', () => {
            expect(() =>
                validateAppointmentRules(nextWeekday(3), '10:00')
            ).not.toThrow();
        });
    });

    describe('fechas pasadas', () => {
        it('rechaza fechas en el pasado', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            expect(() =>
                validateAppointmentRules(yesterday, '10:00')
            ).toThrow('fechas pasadas');
        });
    });

    describe('anticipación mínima de 24 horas', () => {
        it('rechaza turnos con menos de 24 horas de anticipación', () => {
            const inTwoHours = new Date();
            inTwoHours.setHours(inTwoHours.getHours() + 2);
            expect(() =>
                validateAppointmentRules(inTwoHours, '10:00')
            ).toThrow('24 horas');
        });
    });

    describe('fines de semana', () => {
        it('rechaza turnos en sábado', () => {
            // Find next saturday that is far enough in the future
            const d = new Date();
            d.setDate(d.getDate() + 7);
            while (d.getUTCDay() !== 6) d.setDate(d.getDate() + 1);
            expect(() =>
                validateAppointmentRules(d, '10:00')
            ).toThrow('fines de semana');
        });

        it('rechaza turnos en domingo', () => {
            const d = new Date();
            d.setDate(d.getDate() + 7);
            while (d.getUTCDay() !== 0) d.setDate(d.getDate() + 1);
            expect(() =>
                validateAppointmentRules(d, '10:00')
            ).toThrow('fines de semana');
        });
    });

    describe('horario de negocio', () => {
        it('rechaza turnos antes de las 08:00', () => {
            expect(() =>
                validateAppointmentRules(nextWeekday(3), '07:00')
            ).toThrow('08:00');
        });

        it('rechaza turnos después de las 17:00', () => {
            expect(() =>
                validateAppointmentRules(nextWeekday(3), '18:00')
            ).toThrow('08:00');
        });

        it('acepta turno exactamente a las 08:00', () => {
            expect(() =>
                validateAppointmentRules(nextWeekday(3), '08:00')
            ).not.toThrow();
        });

        it('acepta turno exactamente a las 17:00', () => {
            expect(() =>
                validateAppointmentRules(nextWeekday(3), '17:00')
            ).not.toThrow();
        });
    });
});
