import { Product } from 'src/products/Products';

export interface Dish {
  id: number;
  name: string;
  servings: number;
  description?: string;
  products: Product[];
}
