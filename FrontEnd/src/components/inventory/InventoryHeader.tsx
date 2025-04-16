
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, PlusCircle } from 'lucide-react';

interface InventoryHeaderProps {
  onAddProduct: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({ onAddProduct }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight flex items-center">
        <Package className="mr-2 h-8 w-8" />
        Inventory Management
      </h1>
      <Button onClick={onAddProduct}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
};

export default InventoryHeader;
