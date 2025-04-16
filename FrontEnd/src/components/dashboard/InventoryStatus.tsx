
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const inventoryData = [
  { id: 1, name: "Office Chair Deluxe", stock: 24, status: "In Stock" },
  { id: 2, name: "Standing Desk Pro", stock: 5, status: "Low Stock" },
  { id: 3, name: "Wireless Keyboard", stock: 0, status: "Out of Stock" },
  { id: 4, name: "Ergonomic Mouse", stock: 12, status: "In Stock" },
  { id: 5, name: "Monitor 27\"", stock: 3, status: "Low Stock" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Out of Stock":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "";
  }
};

const InventoryStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryData.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Stock: {item.stock} units</p>
              </div>
              <Badge variant="outline" className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
