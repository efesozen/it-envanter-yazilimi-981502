import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Supplier } from '@saas-template/database';
import type { CreateSupplierDto, UpdateSupplierDto } from '@saas-template/core';

@Injectable()
export class SuppliersRepository extends Repository<Supplier> {
  constructor(private dataSource: DataSource) {
    super(Supplier, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Supplier[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Supplier | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.create({
      ...dto,
      userId,
    });
    return this.save(supplier);
  }

  async update(id: string, userId: string, dto: UpdateSupplierDto): Promise<Supplier | null> {
    const supplier = await this.findById(id, userId);
    if (!supplier) {
      return null;
    }

    Object.assign(supplier, dto);
    return this.save(supplier);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const supplier = await this.findById(id, userId);
    if (!supplier) {
      return false;
    }

    await this.softRemove(supplier);
    return true;
  }
}
