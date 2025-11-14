import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  contact_info?: Record<string, unknown>;
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsOptional()
  contact_info?: Record<string, unknown> | undefined;
}

export class SupplierResponseDto {
  id!: string;
  name!: string;
  contact_info?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
