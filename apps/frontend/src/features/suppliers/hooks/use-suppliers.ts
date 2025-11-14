import type { CreateSupplierDto, UpdateSupplierDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { suppliersService } from '../services';

const SUPPLIER_KEY = ['suppliers'];

export function useSuppliers() {
  return useQuery({
    queryKey: SUPPLIER_KEY,
    queryFn: () => suppliersService.getAll(),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: [...SUPPLIER_KEY, id],
    queryFn: () => suppliersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupplierDto) => suppliersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEY });
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierDto }) =>
      suppliersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEY });
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => suppliersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEY });
    },
  });
}
