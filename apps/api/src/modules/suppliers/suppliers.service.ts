import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateSupplierDto, SupplierResponseDto, UpdateSupplierDto } from '@saas-template/core';
import type { Supplier } from '@saas-template/database';
import { SuppliersRepository } from './suppliers.repository';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly suppliersRepository: SuppliersRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<SupplierResponseDto[]> {
    const suppliers = await this.suppliersRepository.findAll(userId);
    return suppliers.map((supplier: Supplier) => this.toResponseDto(supplier));
  }

  async findOne(id: string, userId: string): Promise<SupplierResponseDto> {
    const supplier = await this.suppliersRepository.findById(id, userId);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return this.toResponseDto(supplier);
  }

  async create(userId: string, dto: CreateSupplierDto): Promise<SupplierResponseDto> {
    return this.uow.execute(async () => {
      const supplier = await this.suppliersRepository.create(userId, dto);
      return this.toResponseDto(supplier);
    });
  }

  async update(id: string, userId: string, dto: UpdateSupplierDto): Promise<SupplierResponseDto> {
    return this.uow.execute(async () => {
      const supplier = await this.suppliersRepository.update(id, userId, dto);
      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }
      return this.toResponseDto(supplier);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.suppliersRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Supplier not found');
      }
    });
  }

  private toResponseDto(supplier: Supplier): SupplierResponseDto {
    return {
      id: supplier.id,
      name: supplier.name,
      contact_info: supplier.contact_info,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    };
  }
}
