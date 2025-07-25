import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  // Sends an email using the provided contact information
  async sendMail(name: string, email: string, message: string) {
    try {
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
               <p><strong>Message:</strong><br>${message}</p>`,
      });
    } catch {
      // Throws if sending the email fails
      throw new BadRequestException('Failed to send contact email');
    }
  }
}
