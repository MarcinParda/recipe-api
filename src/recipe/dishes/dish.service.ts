import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  create(dish: CreateDishDTO) {
    const newDish = new Dish();
    Object.assign(newDish, dish);
    return newDish.save();
  }

  read() {
    return Dish.find();
  }

  async getOneById(id: number) {
    const dish = await Dish.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException(`Dish with id ${id} not found`);
    }
    return dish;
  }

  async update(dish: UpdateDishDTO) {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate.save();
  }

  async delete(dishId: number) {
    const dishToDelete = await this.getOneById(dishId);
    return dishToDelete.remove();
  }
}
