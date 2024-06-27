import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.repo.save(createProductDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    this.logger.log(`Finding product with id ${id}`);

    const product = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      this.logger.warn(`Product with id ${id} not found`);
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.logger.log(`Updating product with id ${id}`);
    return this.repo.update(id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
