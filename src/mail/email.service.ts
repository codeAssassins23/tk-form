import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // Método en MailService para enviar confirmación a un correo específico
  async sendRegistrationNotification(save: any, notificationEmail: string) {
    const url = `http://localhost:3200/leads`; // URL para ver el usuario en el sistema
    if (save.country === 'usd') {
      save.country = 'Estados Unidos';
    } else if (save.country === 'mxn') {
      save.country = 'México';
    } else if (save.country === 'word') {
      save.country = 'Canada';
    }
    await this.mailerService.sendMail({
      to: notificationEmail, // Enviar a la dirección de correo específica
      from: '"FORMULARIO WEB TKAMBIO.US | REGISTRATE" <IT@tkambio.us>', // Opcional: especificar el remitente
      subject: `El Cliente ${save.email} esta iniciando el proceso de pre registro.`,
      template: './confirmation', // Usar una plantilla específica para notificaciones
      context: {
        // Enviar la información del usuario en el contexto
        fullName: save.fullName,
        email: save.email,
        corporate: save.corporate,
        phone: save.phone,
        country: save.country,
        url,
      },
    });
  }
}
