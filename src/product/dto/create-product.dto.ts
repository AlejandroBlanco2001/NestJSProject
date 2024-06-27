import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto implements Readonly<CreateProductDto> {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  cantidad: number;
}
