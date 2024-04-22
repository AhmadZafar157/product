import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { productDto } from '../DTOs/productDto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel : Model<Product>){}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async create(createProductDto: productDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async update(id: string, updateProductDto: productDto): Promise<Product> {
        const existingProduct = await this.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        Object.assign(existingProduct, updateProductDto);
        return existingProduct.save();
    }

    async remove(id: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
        if (!deletedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return deletedProduct;
    }
};