import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class CreateOrderDto {
  @IsUUID()
  user_id!: string;

  @IsUUID()
  inventory_item_id!: string;

  @IsNumber()
  quantity!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsUUID()
  inventory_item_id?: string | undefined;

  @IsOptional()
  @IsNumber()
  quantity?: number | undefined;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus | undefined;
}

export class OrderResponseDto {
  id!: string;
  user_id!: string;
  inventory_item_id!: string;
  quantity!: number;
  status!: OrderStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
