export interface Product {
  id: number;
  name: string;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'tsp' | 'sp' | 'pinch' | 'item';
  amount: number;
  dishId: number;
}
