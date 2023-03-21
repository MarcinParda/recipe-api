import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private dishService: DishService) {
    this.dishService = dishService;
  }

  @Post() createOne(@Body() dish: CreateDishDTO) {
    return this.dishService.create(dish);
  }

  @Get()
  readAll() {
    return this.dishService.read();
  }

  @Put() updateOne(@Body() dish: UpdateDishDTO) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId);
  }
}
