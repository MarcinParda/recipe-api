import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [];
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getOneById(dishId: number): Dish {
    const dish = this.dishes.find((d) => d.id === dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with id: ${dishId} not found`);
    }
    return {
      ...dish,
      products: this.productService.getAllByDishId(dishId),
    };
  }

  create(dish: CreateDishDTO) {
    const newDish: Dish = {
      ...dish,
      id: this.trackId++,
      products: [],
    };
    this.dishes.push(newDish);
    return newDish;
  }

  read(): readonly Dish[] {
    return this.dishes.map((dish) => ({
      ...dish,
      products: this.productService.getAllByDishId(dish.id),
    }));
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
