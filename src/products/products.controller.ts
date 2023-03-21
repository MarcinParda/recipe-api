import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DishService } from 'src/dishes/dish.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductService,
    private dishService: DishService,
  ) {
    this.productService = productService;
    this.dishService = dishService;
  }

  @Post() createOne(@Body() product: CreateProductDTO) {
    this.dishService.getOneById(product.dishId);
    return this.productService.create(product);
  }

  @Get()
  readAll() {
    return this.productService.read();
  }

  @Put() updateOne(@Body() product: UpdateProductDTO) {
    return this.productService.update(product);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.delete(productId);
  }
}
