import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from '../dishes/dish.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Product, (product) => product.ingredients)
  product: Product;

  @ManyToOne(() => Dish, (dish) => dish.ingredients)
  dish: Dish;
}
