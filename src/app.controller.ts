import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/user')
  getSample() {
    return { name: 'John Doe' };
  }
}
