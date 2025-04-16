
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Wallet, 
  Truck, 
  Settings, 
  LogOut,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: ShoppingCart, label: 'Sales', href: '/sales' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: DollarSign, label: 'Expenses', href: '/expenses' },
  { icon: Wallet, label: 'Debts & Loans', href: '/debts' },
  { icon: Truck, label: 'Suppliers', href: '/suppliers' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout, isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-border h-screen sticky top-0">
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Shop Manager</h1>
      </div>
      
      {isAuthenticated && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <UserCircle className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => logout()}
          className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
