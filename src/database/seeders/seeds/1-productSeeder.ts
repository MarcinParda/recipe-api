import { Factory, Seeder } from 'typeorm-seeding';
import { Product } from '../../../recipe/products/product.entity';
import { initializeSeeds } from '../initailizeSeeds';

initializeSeeds();

export default class productSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Product)().createMany(15);
  }
}
