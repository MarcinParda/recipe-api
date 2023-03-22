import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  servings: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @OneToMany(() => Product, (product) => product.dish)
  products: Product[];

  @ManyToOne(() => User, (user) => user.dishes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;
}
