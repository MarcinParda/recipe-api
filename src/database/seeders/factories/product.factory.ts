import { define } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';
import { Product, UnitType } from '../../../recipe/products/product.entity';

const units: UnitType[] = ['kg', 'g', 'tsp', 'sp', 'pinch', 'ml', 'l', 'item'];

define(Product, (faker: Faker) => {
  const product = new Product();
  product.name = faker.commerce.productName();
  product.unit = units[Math.floor(Math.random() * units.length)];
  return product;
});
