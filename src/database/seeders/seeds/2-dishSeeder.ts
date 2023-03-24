import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../auth/user/user.entity';
import { Dish } from '../../../recipe/dishes/dish.entity';
import { initializeSeeds } from '../initializeSeeds';

initializeSeeds();

export default class dishSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await connection.getRepository(User).find();
    await factory(Dish)()
      .map(async (dish: Dish) => {
        dish.user = user[Math.floor(Math.random() * user.length)];
        return dish;
      })
      .createMany(15);
  }
}
