import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentSales from '@/components/dashboard/RecentSales';
import TopProducts from '@/components/dashboard/TopProducts';
import ExpensesChart from '@/components/dashboard/ExpensesChart';
import SalesChart from '@/components/dashboard/SalesChart';
import InventoryStatus from '@/components/dashboard/InventoryStatus';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import salesService from '@/api/salesService';
import inventoryService from '@/api/inventoryService';
import customerService from '@/api/customerService';

const Index = () => {
  // Fetch dashboard data from backend
  const { data: sales, isLoading: salesLoading } = useQuery({
    queryKey: ['dashboard-sales'],
    queryFn: salesService.getSales,
  });
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['dashboard-products'],
    queryFn: inventoryService.getProducts,
  });
  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['dashboard-customers'],
    queryFn: customerService.getCustomers,
  });

  console.log(sales);

  // Calculate stats or show null if no data
  const totalSales = sales && sales.length > 0 ? sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0) : null;
  const totalProducts = products && products.length > 0 ? products.length : null;
  const totalCustomers = customers && customers.length > 0 ? customers.length : null;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Jumla ya Mauzo" 
            value={totalSales !== null ? totalSales : 'null'} 
            icon={<DollarSign className="h-4 w-4" />} 
          />
          <StatCard 
            title="Bidhaa Zote" 
            value={totalProducts !== null ? totalProducts : 'null'} 
            icon={<Package className="h-4 w-4" />} 
          />
          <StatCard 
            title="Wateja Hai" 
            value={totalCustomers !== null ? totalCustomers : 'null'} 
            icon={<Users className="h-4 w-4" />} 
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
