import { api } from '@/lib/api';
import type { InventoryitemResponseDto, CreateInventoryitemDto, UpdateInventoryitemDto } from '@saas-template/core';

export const inventoryitemsService = {
  async getAll(): Promise<InventoryitemResponseDto[]> {
    const response = await api.get('/inventoryitems');
    return response.data;
  },

  async getById(id: string): Promise<InventoryitemResponseDto> {
    const response = await api.get(`/inventoryitems/${id}`);
    return response.data;
  },

  async create(data: CreateInventoryitemDto): Promise<InventoryitemResponseDto> {
    const response = await api.post('/inventoryitems', data);
    return response.data;
  },

  async update(id: string, data: UpdateInventoryitemDto): Promise<InventoryitemResponseDto> {
    const response = await api.put(`/inventoryitems/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/inventoryitems/${id}`);
  },
};
