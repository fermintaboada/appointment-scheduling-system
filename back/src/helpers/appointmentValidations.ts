export function validateAppointmentRules(date: Date, time: string): void {
    const [hours, minutes] = time.split(':').map(Number);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes, 0);

    const appointmentArg = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
    const nowArg = new Date(Date.now() - 3 * 60 * 60 * 1000);

    if (appointmentArg < nowArg) {
        throw new Error('No se pueden crear citas para fechas pasadas');
    }

    const diffHours = (appointmentArg.getTime() - nowArg.getTime()) / (1000 * 60 * 60);
    if (diffHours < 24) {
        throw new Error('Las citas deben agendarse con más de 24 horas de antelación');
    }

    const dayOfWeek = appointmentArg.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        throw new Error('No se pueden agendar citas los fines de semana');
    }

    if (hours < 8 || hours > 17) {
        throw new Error('Las citas deben agendarse entre las 08:00 y 18:00');
    }
}
