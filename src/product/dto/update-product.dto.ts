import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';

/**
 * I duplicated the code from the create-product.dto.ts
 * to be able to use APIProperty decorator,
 * it's not necessary to do this at all. God bless NestJS
 */

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(255)
  @ApiProperty({
    description: 'Nombre del producto',
    required: true,
    default: 'Producto',
    type: String,
  })
  nombre: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    description: 'Descripción del producto',
    required: false,
    default: 'Descripción del producto',
    type: String,
  })
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Precio del producto',
    required: true,
    default: 0,
    type: Number,
  })
  precio: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  @ApiProperty({
    description: 'Cantidad de productos',
    required: true,
    default: 0,
    type: Number,
  })
  cantidad: number;
}
