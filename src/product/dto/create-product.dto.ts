import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

const MIN_PRICE_VALUE = 0;
const MIN_QUANTITY_VALUE = 0;
const MAX_NAME_LENGTH = 255;

export class CreateProductDto implements Readonly<CreateProductDto> {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(MAX_NAME_LENGTH)
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

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(MIN_PRICE_VALUE)
  @ApiProperty({
    description: 'Precio del producto',
    required: true,
    default: 0,
    type: Number,
  })
  precio: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(MIN_QUANTITY_VALUE)
  @IsInt()
  @ApiProperty({
    description: 'Cantidad de productos',
    required: true,
    default: 0,
    type: Number,
  })
  cantidad: number;
}
