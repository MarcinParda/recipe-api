import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  trackId = 1;
  dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      servings: 1,
      description: 'A delicious pizza',
    },
  ];

  @Get()
  readAll() {
    return this.dishes;
  }

  @Post() createOne(@Body() dish: CreateDishDTO) {
    const newDish = {
      ...dish,
      id: this.trackId++,
    };
    this.dishes.push(newDish);
    return this.dishes;
  }

  @Put() updateOne(@Body() dish: UpdateDishDTO) {
    const dishToUpdate = this.dishes.find((d) => d.id === Number(dish.id));
    if (!dishToUpdate) {
      throw new NotFoundException(`Dish with id: ${dish.id} not found`);
    }
    Object.assign(dishToUpdate, dish);
    return this.dishes;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    const dishToDelete = this.dishes.find((d) => d.id === Number(dishId));
    if (!dishToDelete) {
      throw new NotFoundException(`Dish with id: ${dishId} not found`);
    }
    this.dishes = this.dishes.filter((d) => d.id !== Number(dishId));
    return this.dishes;
  }
}
