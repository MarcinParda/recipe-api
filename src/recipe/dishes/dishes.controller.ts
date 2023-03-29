import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth/jwt.guard';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  private dishService: DishService;

  constructor(dishService: DishService) {
    this.dishService = dishService;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOne(@Req() req, @Body() dish: CreateDishDto) {
    return this.dishService.create(req.user.id, dish);
  }

  @Get()
  readAll() {
    return this.dishService.read();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.getOneById(dishId);
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDto) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId);
  }
}
