
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  { id: 1, customer: "Jane Cooper", product: "Office Chair", amount: 350, date: "2 minutes ago" },
  { id: 2, customer: "Wade Warren", product: "Desk Lamp", amount: 125, date: "5 minutes ago" },
  { id: 3, customer: "Esther Howard", product: "Notebook Set", amount: 48, date: "10 minutes ago" },
  { id: 4, customer: "Cameron Williamson", product: "Monitor Stand", amount: 99, date: "1 hour ago" },
  { id: 5, customer: "Brooklyn Simmons", product: "Wireless Mouse", amount: 75, date: "2 hours ago" },
];

const RecentSales = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{sale.customer}</p>
                <p className="text-xs text-muted-foreground">{sale.product}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${sale.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{sale.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
