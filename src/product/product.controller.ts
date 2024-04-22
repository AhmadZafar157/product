import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { productDto } from '../DTOs/productDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    console.log("Reached!");
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    console.log("Reached!");
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Post()
  async create(@Body() createProductDto: productDto): Promise<Product> {
    console.log("Reached!");
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: productDto): Promise<Product> {
    console.log("Reached!");
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    console.log("Reached!");
    return this.productService.remove(id);
  }
}
