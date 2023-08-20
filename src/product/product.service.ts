import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './model/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    })

    if (product) {
      throw new BadRequestException('Product already exists in database.'); 
    };

    const newProduct = this.productRepository.create(createProductDto);

    await this.productRepository.save(newProduct);

    const { created_at, updatet_at, ...productReturn } = newProduct;

    return productReturn;
  }

  async getProducts() {
    return this.productRepository.find({
      select: ['idProduct', 'name', 'price', 'quantity'],
    });
  }

  async getOneProduct(name: string) {
    const product = await this.findProductByName(name);
     
    return product;
  }

  async findProductByName(name: string) {
    const product = await this.productRepository.findOne({
      where: { name },
    })

    if (!product) {
      throw new BadRequestException('Product not found.'); 
    };

    return product;
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const product = await this.findProductByName(updateProductDto.name);

    await this.productRepository.update(product.idProduct, { ...updateProductDto });

    return { success: 'Product updated' };
  }

  async deleteProduct(name: string) {
    const product = await this.findProductByName(name);

    await this.productRepository.remove(product);

    return { success: 'Product deleted' };

  }
}
