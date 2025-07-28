/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ContactService } from './contact.service';
import { BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('ContactService', () => {
  let service: ContactService;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
    service = new ContactService();
  });

  it('should send mail successfully', async () => {
    sendMailMock.mockResolvedValueOnce(undefined);
    await expect(
      service.sendMail('Max', 'max@example.com', 'Hallo'),
    ).resolves.toBeUndefined();
    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(String),
        to: expect.any(String),
        replyTo: 'max@example.com',
        subject: 'New Contact Request',
        html: expect.stringContaining('Hallo'),
      }),
    );
  });

  it('should throw BadRequestException if sending fails', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('fail'));
    await expect(
      service.sendMail('Max', 'max@example.com', 'Hallo'),
    ).rejects.toThrow(BadRequestException);
  });
});
