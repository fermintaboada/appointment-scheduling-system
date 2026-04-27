import { Resend } from 'resend';
import { RESEND_API_KEY } from '../config/env';

const resend = new Resend(RESEND_API_KEY);

const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
};

export const sendAppointmentConfirmation = async (
    userEmail: string,
    userName: string,
    date: Date | string,
    time: string,
    appointmentId: number
): Promise<void> => {
    if (!RESEND_API_KEY) return;

    const formattedDate = formatDate(String(date));

    await resend.emails.send({
        from: 'Q-Golf <onboarding@resend.dev>',
        to: userEmail,
        subject: `Turno confirmado — ${formattedDate}`,
        html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#F4F1EC;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F1EC;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#F9F6F0;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,80,22,0.10);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1C2B1A;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#C8A96E;letter-spacing:0.08em;">Q-Golf</p>
              <p style="margin:8px 0 0;font-size:12px;color:rgba(244,241,236,0.55);letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">Club de Golf</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4A7C3F;">Turno confirmado</p>
              <h1 style="margin:0 0 24px;font-family:'Georgia',serif;font-size:26px;font-weight:400;color:#2D5016;line-height:1.2;">Hola, ${userName}</h1>
              <p style="margin:0 0 28px;font-size:15px;color:#4A4A3A;line-height:1.7;font-family:Arial,sans-serif;">
                Tu turno en Q-Golf ha sido reservado correctamente. Te esperamos en el campo.
              </p>

              <!-- Turno card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F1EC;border-radius:12px;border:1px solid rgba(200,169,110,0.3);margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:16px;border-bottom:1px solid rgba(200,169,110,0.2);">
                          <p style="margin:0;font-size:11px;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#8B7355;">Turno #${appointmentId}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:16px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%">
                                <p style="margin:0 0 4px;font-size:11px;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B7355;">Fecha</p>
                                <p style="margin:0;font-family:'Georgia',serif;font-size:16px;color:#2D5016;text-transform:capitalize;">${formattedDate}</p>
                              </td>
                              <td width="50%">
                                <p style="margin:0 0 4px;font-size:11px;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#8B7355;">Hora</p>
                                <p style="margin:0;font-family:'Georgia',serif;font-size:16px;color:#2D5016;">${time} hs</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#8B7355;line-height:1.65;font-family:Arial,sans-serif;">
                Si necesitás cancelar tu turno, podés hacerlo desde <strong>Mis Turnos</strong> en la plataforma con al menos 24 horas de anticipación.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(200,169,110,0.15);padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(74,74,58,0.45);font-family:Arial,sans-serif;letter-spacing:0.03em;">
                © ${new Date().getFullYear()} Q-Golf · Todos los derechos reservados
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
    });
};
