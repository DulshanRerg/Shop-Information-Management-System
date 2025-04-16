
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const productsData = [
  { id: 1, name: "Office Chair Deluxe", sales: 145, progress: 100 },
  { id: 2, name: "Standing Desk Pro", sales: 120, progress: 83 },
  { id: 3, name: "Wireless Keyboard", sales: 98, progress: 68 },
  { id: 4, name: "Ergonomic Mouse", sales: 85, progress: 59 },
  { id: 5, name: "Monitor 27\"", sales: 74, progress: 51 },
];

const TopProducts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productsData.map((product) => (
            <div key={product.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales</p>
              </div>
              <Progress value={product.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
