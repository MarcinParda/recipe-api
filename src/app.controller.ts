import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Post()
  createFruit(@Body() fruit: { name: string }) {
    return { fruit };
  }

  @Put()
  updateFruit(@Body() fruit: { name: string }) {
    return { fruit };
  }

  @Delete(':fruitId')
  deleteFruit(@Param('fruitId') fruitId: string) {
    return { fruitId };
  }
}
