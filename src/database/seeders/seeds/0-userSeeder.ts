import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../../auth/user/user.entity';
import { initializeSeeds } from '../initailizeSeeds';

initializeSeeds();

export default class userSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(15);
  }
}
