import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';

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

  @Post() createOne(@Body() dish: Dish) {
    dish.id = this.trackId++;
    this.dishes.push(dish);
    return this.dishes;
  }

  @Put() updateOne(@Body() dish: Dish) {
    const dishToUpdate = this.dishes.find((d) => d.id === Number(dish.id));
    if (dishToUpdate) {
      Object.assign(dishToUpdate, dish);
    }
    return this.dishes;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    this.dishes = this.dishes.filter((d) => d.id !== Number(dishId));
    return this.dishes;
  }
}
