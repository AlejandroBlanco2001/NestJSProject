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

export class CreateProductDto implements Readonly<CreateProductDto> {
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

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(0)
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
  @Min(0)
  @IsInt()
  @ApiProperty({
    description: 'Cantidad de productos',
    required: true,
    default: 0,
    type: Number,
  })
  cantidad: number;
}
