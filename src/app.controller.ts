import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello !';
  }

  @Get('/user')
  getSample(@Query('name') name: string) {
    console.log(`Action!`);
    return { name };
  }

  @Post()
  createFruit(@Body() fruit: { name: string }) {
    return { fruit };
  }

  @Put()
  updateFruit(@Body() fruit: { name: string }) {
    return fruit;
  }

  @Delete(':fruitId')
  deleteFruit(@Param('fruitId') fruitId: string) {
    return { fruitId };
  }
}
