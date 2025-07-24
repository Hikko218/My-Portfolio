import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendMessage(
    @Body() body: { name: string; email: string; message: string },
  ) {
    await this.contactService.sendEmail(body.name, body.email, body.message);
    return { success: true };
  }
}
