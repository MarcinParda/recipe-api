import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './Products';

@Controller('products')
export class ProductsController {
  trackId = 1;
  products: Product[] = [];

  @Get()
  readAll() {
    return this.products;
  }

  @Post() createOne(@Body() product: CreateProductDTO) {
    const newProduct = {
      ...product,
      id: this.trackId++,
    };
    this.products.push(newProduct);
    return this.products;
  }

  @Put() updateOne(@Body() product: UpdateProductDTO) {
    const productToUpdate = this.products.find(
      (d) => d.id === Number(product.id),
    );
    if (!productToUpdate) {
      throw new NotFoundException(`product with id: ${product.id} not found`);
    }
    Object.assign(productToUpdate, product);
    return this.products;
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    const productToDelete = this.products.find((d) => d.id === productId);
    if (!productToDelete) {
      throw new NotFoundException(`product with id: ${productId} not found`);
    }
    this.products = this.products.filter((d) => d.id !== Number(productId));
    return this.products;
  }
}
