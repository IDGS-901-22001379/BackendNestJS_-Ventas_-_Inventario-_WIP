import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty() @MaxLength(48)
  sku!: string;

  @IsString() @IsNotEmpty() @MaxLength(120)
  name!: string;

  @IsOptional() @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }) @IsPositive()
  price!: number; // Prisma Decimal acepta number aquí

  @IsInt() @IsOptional()
  stock?: number = 0;

  @IsBoolean() @IsOptional()
  active?: boolean = true;
}
