'use client';

import { useSuppliers } from '@/features/suppliers/hooks/use-suppliers';

export default function SupplierManagementPage() {
  const { data: suppliers, isLoading } = useSuppliers();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Supplier Management</h1>
      <p className="text-muted-foreground mb-6">Manage suppliers and vendors associated with the inventory.</p>
      
      <div className="grid gap-4">
        {suppliers?.map((supplier: any) => (
          <div key={supplier.id} className="border rounded p-4">
            <pre>{JSON.stringify(supplier, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
