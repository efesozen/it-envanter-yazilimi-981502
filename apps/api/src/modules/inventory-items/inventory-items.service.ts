import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateInventoryitemDto, InventoryitemResponseDto, UpdateInventoryitemDto } from '@saas-template/core';
import type { Inventoryitem } from '@saas-template/database';
import { InventoryitemsRepository } from './inventoryitems.repository';

@Injectable()
export class InventoryitemsService {
  constructor(
    private readonly inventoryitemsRepository: InventoryitemsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<InventoryitemResponseDto[]> {
    const inventoryitems = await this.inventoryitemsRepository.findAll(userId);
    return inventoryitems.map((inventoryitem: Inventoryitem) => this.toResponseDto(inventoryitem));
  }

  async findOne(id: string, userId: string): Promise<InventoryitemResponseDto> {
    const inventoryitem = await this.inventoryitemsRepository.findById(id, userId);
    if (!inventoryitem) {
      throw new NotFoundException('Inventoryitem not found');
    }
    return this.toResponseDto(inventoryitem);
  }

  async create(userId: string, dto: CreateInventoryitemDto): Promise<InventoryitemResponseDto> {
    return this.uow.execute(async () => {
      const inventoryitem = await this.inventoryitemsRepository.create(userId, dto);
      return this.toResponseDto(inventoryitem);
    });
  }

  async update(id: string, userId: string, dto: UpdateInventoryitemDto): Promise<InventoryitemResponseDto> {
    return this.uow.execute(async () => {
      const inventoryitem = await this.inventoryitemsRepository.update(id, userId, dto);
      if (!inventoryitem) {
        throw new NotFoundException('Inventoryitem not found');
      }
      return this.toResponseDto(inventoryitem);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.inventoryitemsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Inventoryitem not found');
      }
    });
  }

  private toResponseDto(inventoryitem: Inventoryitem): InventoryitemResponseDto {
    return {
      id: inventoryitem.id,
      name: inventoryitem.name,
      description: inventoryitem.description,
      quantity: inventoryitem.quantity,
      barcode: inventoryitem.barcode,
      supplier_id: inventoryitem.supplier_id,
      createdAt: inventoryitem.createdAt,
      updatedAt: inventoryitem.updatedAt,
    };
  }
}
