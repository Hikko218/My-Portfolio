import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendMessage(@Body() body: ContactDto) {
    await this.contactService.sendMail(body.name, body.email, body.message);
    return { success: true };
  }
}
