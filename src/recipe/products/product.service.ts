import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDTO) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  read() {
    return Product.find();
  }

  async getOneById(id: number) {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(product: UpdateProductDTO) {
    const productToUpdate = await this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate.save();
  }

  async delete(id: number) {
    const productToDelete = await this.getOneById(id);
    return productToDelete.remove();
  }
}
