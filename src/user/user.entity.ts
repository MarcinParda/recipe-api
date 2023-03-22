import { Dish } from 'src/recipe/dishes/dish.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @OneToMany(() => Dish, (dish) => dish.user)
  dishes: Dish[];
}
