import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // Método en MailService para enviar confirmación a un correo específico
  async sendRegistrationNotification(save: any, notificationEmail: string) {
    const url = `http://example.com/user/${save.idLead}`; // URL para ver el usuario en el sistema

    await this.mailerService.sendMail({
      to: notificationEmail, // Enviar a la dirección de correo específica
      from: '"Support Team" <support@example.com>', // Opcional: especificar el remitente
      subject: 'Nuevo registro completado',
      template: './new-user-notification', // Usar una plantilla específica para notificaciones
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
