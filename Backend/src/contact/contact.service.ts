import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(name: string, email: string, message: string) {
    await this.mailerService.sendMail({
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: 'Neue Nachricht über das Kontaktformular',
      template: 'contact', // → templates/contact.hbs
      context: {
        name,
        email,
        message,
      },
    });
  }
}
