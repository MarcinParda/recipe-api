import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from '../dishes/dish.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar' })
  unit: 'kg' | 'g' | 'l' | 'ml' | 'tsp' | 'sp' | 'pinch' | 'item';

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Dish, (dish) => dish.products, {
    onDelete: 'CASCADE',
  })
  dish: Dish;
}
