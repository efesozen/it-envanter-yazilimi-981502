import { api } from '@/lib/api';
import type { SupplierResponseDto, CreateSupplierDto, UpdateSupplierDto } from '@saas-template/core';

export const suppliersService = {
  async getAll(): Promise<SupplierResponseDto[]> {
    const response = await api.get('/suppliers');
    return response.data;
  },

  async getById(id: string): Promise<SupplierResponseDto> {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  },

  async create(data: CreateSupplierDto): Promise<SupplierResponseDto> {
    const response = await api.post('/suppliers', data);
    return response.data;
  },

  async update(id: string, data: UpdateSupplierDto): Promise<SupplierResponseDto> {
    const response = await api.put(`/suppliers/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/suppliers/${id}`);
  },
};
