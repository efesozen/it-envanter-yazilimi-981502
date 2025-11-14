import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inventoryitem } from '@saas-template/database';
import type { CreateInventoryitemDto, UpdateInventoryitemDto } from '@saas-template/core';

@Injectable()
export class InventoryitemsRepository extends Repository<Inventoryitem> {
  constructor(private dataSource: DataSource) {
    super(Inventoryitem, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Inventoryitem[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Inventoryitem | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateInventoryitemDto): Promise<Inventoryitem> {
    const inventoryitem = this.create({
      ...dto,
      userId,
    });
    return this.save(inventoryitem);
  }

  async update(id: string, userId: string, dto: UpdateInventoryitemDto): Promise<Inventoryitem | null> {
    const inventoryitem = await this.findById(id, userId);
    if (!inventoryitem) {
      return null;
    }

    Object.assign(inventoryitem, dto);
    return this.save(inventoryitem);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const inventoryitem = await this.findById(id, userId);
    if (!inventoryitem) {
      return false;
    }

    await this.softRemove(inventoryitem);
    return true;
  }
}
