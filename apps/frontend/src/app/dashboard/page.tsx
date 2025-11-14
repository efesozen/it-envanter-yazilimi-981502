'use client';

import { useInventoryItems } from '@/features/inventory-items/hooks/use-inventory-items';

export default function DashboardPage() {
  const { data: inventoryItems, isLoading } = useInventoryItems();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main dashboard for logged-in users to manage their inventory.</p>
      
      <div className="grid gap-4">
        {inventoryItems?.map((inventoryItem: any) => (
          <div key={inventoryItem.id} className="border rounded p-4">
            <pre>{JSON.stringify(inventoryItem, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
