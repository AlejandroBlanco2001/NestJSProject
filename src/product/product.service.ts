import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from 'src/model/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    this.logger.log(`Creating product with name ${createProductDto.nombre}`);

    const product = await this.repo.create(createProductDto);

    this.logger.log(`Product created with id ${product.id}`);

    return this.repo.save(createProductDto);
  }

  async findAll(limit: number, page: number) {
    this.logger.log('Finding all products');

    const products = await this.repo.find({
      take: limit,
      skip: limit * (page - 1),
    });

    return products;
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

    this.logger.log(`Product found with id ${id}`);

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.logger.log(`Updating product with id ${id}`);
    return this.repo.update(id, updateProductDto);
  }

  remove(id: number) {
    this.logger.log(`Deleting product with id ${id}`);
    return this.repo.delete(id);
  }
}
