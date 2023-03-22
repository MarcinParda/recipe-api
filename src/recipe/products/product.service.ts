import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DishService } from '../dishes/dish.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private dishService: DishService;

  constructor(@Inject(forwardRef(() => DishService)) dishService: DishService) {
    this.dishService = dishService;
  }

  async create(product: CreateProductDTO) {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    const dish = await this.dishService.getOneById(product.dishId);
    newProduct.dish = dish;
    return newProduct.save();
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
