import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/utils/decoratos/role.decorator';
import { TypeUserEnum } from 'src/user/enum/type-user.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ){}

  @Roles(TypeUserEnum.Admin)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  };

  @Roles(TypeUserEnum.Admin, TypeUserEnum.Customer)
  @Get()
  async getProducts() {
    return this.productService.getProducts();
  };
  
  @Roles(TypeUserEnum.Admin)
  @Put('/:nameProduct')
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
  };

  @Roles(TypeUserEnum.Admin, TypeUserEnum.Customer)
  @Get('/:nameProduct')
  async getOneProduct(@Query('nameProduct') nameProduct: string) {
    return this.productService.getOneProduct(nameProduct);
  };

  @Roles(TypeUserEnum.Admin)
  @Delete('/:nameProduct')
  async deleteProduct(@Query('nameProduct') nameProduct: string) {
    return this.productService.deleteProduct(nameProduct);
  };
}
