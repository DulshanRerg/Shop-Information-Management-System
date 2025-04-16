
import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentSales from '@/components/dashboard/RecentSales';
import TopProducts from '@/components/dashboard/TopProducts';
import ExpensesChart from '@/components/dashboard/ExpensesChart';
import SalesChart from '@/components/dashboard/SalesChart';
import InventoryStatus from '@/components/dashboard/InventoryStatus';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Sales" 
            value="$24,780" 
            icon={<DollarSign className="h-4 w-4" />} 
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Total Products" 
            value="512" 
            icon={<Package className="h-4 w-4" />} 
          />
          <StatCard 
            title="New Orders" 
            value="45" 
            icon={<ShoppingCart className="h-4 w-4" />} 
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Active Customers" 
            value="189" 
            icon={<Users className="h-4 w-4" />} 
            trend={{ value: 3, isPositive: false }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SalesChart />
          <ExpensesChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecentSales />
          <InventoryStatus />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
