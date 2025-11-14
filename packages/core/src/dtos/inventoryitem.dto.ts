import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateInventoryitemDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  @MinLength(1)
  barcode!: string;

  @IsOptional()
  @IsUUID()
  supplier_id?: string;
}

export class UpdateInventoryitemDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsNumber()
  quantity?: number | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  barcode?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsUUID()
  supplier_id?: string | undefined;
}

export class InventoryitemResponseDto {
  id!: string;
  name!: string;
  description?: string;
  quantity!: number;
  barcode!: string;
  supplier_id?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
