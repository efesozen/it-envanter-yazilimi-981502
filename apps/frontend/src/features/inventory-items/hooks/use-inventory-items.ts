import type { CreateInventoryitemDto, UpdateInventoryitemDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inventoryitemsService } from '../services';

const INVENTORYITEM_KEY = ['inventoryitems'];

export function useInventoryitems() {
  return useQuery({
    queryKey: INVENTORYITEM_KEY,
    queryFn: () => inventoryitemsService.getAll(),
  });
}

export function useInventoryitem(id: string) {
  return useQuery({
    queryKey: [...INVENTORYITEM_KEY, id],
    queryFn: () => inventoryitemsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateInventoryitem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryitemDto) => inventoryitemsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORYITEM_KEY });
    },
  });
}

export function useUpdateInventoryitem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInventoryitemDto }) =>
      inventoryitemsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORYITEM_KEY });
    },
  });
}

export function useDeleteInventoryitem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryitemsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORYITEM_KEY });
    },
  });
}
