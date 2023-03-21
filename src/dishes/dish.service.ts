import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [];

  getOneById(dishId: number): Dish {
    const dish = this.dishes.find((d) => d.id === dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with id: ${dishId} not found`);
    }
    return dish;
  }

  create(dish: CreateDishDTO) {
    const newDish: Dish = {
      ...dish,
      id: this.trackId++,
    };
    this.dishes.push(newDish);
    return newDish;
  }

  read(): readonly Dish[] {
    return this.dishes;
  }

  update(dish: UpdateDishDTO) {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  delete(dishId: number) {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((d) => d.id !== Number(dishId));
    return { dishId };
  }
}
