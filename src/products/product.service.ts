import { Injectable, NotFoundException } from '@nestjs/common';
import { DishService } from 'src/dishes/dish.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './Products';

@Injectable()
export class ProductService {
  private trackId = 1;
  private products: Product[] = [];

  constructor(private dishService: DishService) {
    this.dishService = dishService;
  }

  readAll() {
    return this.products;
  }

  getOneById(productId: number): Product {
    const product = this.products.find((d) => d.id === productId);
    if (!product) {
      throw new NotFoundException(`Product with id: ${productId} not found`);
    }
    return product;
  }

  create(product: CreateProductDTO) {
    this.dishService.getOneById(product.dishId);
    const newproduct: Product = {
      ...product,
      id: this.trackId++,
    };
    this.products.push(newproduct);
    return newproduct;
  }

  read(): readonly Product[] {
    return this.products;
  }

  update(product: UpdateProductDTO) {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  delete(productId: number) {
    this.getOneById(productId);
    this.products = this.products.filter((d) => d.id !== Number(productId));
    return { productId };
  }
}
