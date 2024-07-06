import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationPipe } from 'src/shared/pipes/paginationPipe.pipe';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the products' })
  @ApiResponse({
    status: 200,
    description: 'Return all the products with pagination of 10 items per page',
  })
  @UsePipes(PaginationPipe)
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Limit of items per page',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number',
  })
  findAll(@Query() query: { limit: number; page: number }) {
    const { limit = 10, page = 1 } = query;

    return this.productService.findAll(limit, page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a particular product given the id' })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the product with the given id',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  @HttpCode(204)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
