import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  async sendMail(name: string, email: string, message: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.NAME}" <${process.env.MAIL}>`,
      to: `${process.env.CONTACT_RECEIVER_EMAIL}`,
      replyTo: email,
      subject: 'New Contact Request',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Nachricht:</strong><br>${message}</p>`,
    });
  }
}
