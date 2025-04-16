
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Truck, 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  MapPin,
  Package,
  ShoppingCart
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample supplier data
const initialSupplierData = [
  { id: 1, name: "Office Depot", contactPerson: "John Smith", email: "john@officedepot.com", phone: "555-1234", address: "123 Main St, City", category: "Office Supplies", status: "Active", lastOrder: "Apr 05, 2025" },
  { id: 2, name: "Tech Solutions Inc", contactPerson: "Jane Doe", email: "jane@techsolutions.com", phone: "555-2345", address: "456 Tech Ave, Town", category: "Electronics", status: "Active", lastOrder: "Apr 10, 2025" },
  { id: 3, name: "Furniture Unlimited", contactPerson: "Robert Johnson", email: "robert@furnitureunlimited.com", phone: "555-3456", address: "789 Comfort Rd, Village", category: "Furniture", status: "Inactive", lastOrder: "Mar 20, 2025" },
  { id: 4, name: "Paper Supply Co", contactPerson: "Emily Clark", email: "emily@papersupply.com", phone: "555-4567", address: "101 Paper St, County", category: "Stationery", status: "Active", lastOrder: "Apr 12, 2025" },
  { id: 5, name: "Electronics Hub", contactPerson: "Michael Brown", email: "michael@ehub.com", phone: "555-5678", address: "202 Digital Dr, Metro", category: "Electronics", status: "Active", lastOrder: "Apr 08, 2025" },
];

// Category options
const supplierCategories = [
  "All Categories",
  "Office Supplies",
  "Electronics",
  "Furniture",
  "Stationery",
  "Other"
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSupplierData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter suppliers based on search and filters
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All Categories" || supplier.category === categoryFilter;
    
    const matchesStatus = statusFilter === "all" || 
                         supplier.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Calculate stats
  const activeSuppliers = suppliers.filter(s => s.status === "Active").length;
  
  // Status badge renderer
  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      : <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Truck className="mr-2 h-8 w-8" />
            Supplier Management
          </h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Suppliers</span>
                <span className="text-3xl font-bold">{suppliers.length}</span>
                <span className="text-sm text-muted-foreground mt-1">{activeSuppliers} active</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Recent Orders</span>
                  <span className="text-3xl font-bold">12</span>
                  <span className="text-sm text-muted-foreground mt-1">Last 30 days</span>
                </div>
                <ShoppingCart className="h-12 w-12 text-muted-foreground/25" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Products Supplied</span>
                  <span className="text-3xl font-bold">248</span>
                  <span className="text-sm text-muted-foreground mt-1">From all suppliers</span>
                </div>
                <Package className="h-12 w-12 text-muted-foreground/25" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search suppliers..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select 
              defaultValue="All Categories"
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {supplierCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Suppliers Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{supplier.contactPerson}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                        {supplier.address}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.lastOrder}</TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Place Order</DropdownMenuItem>
                          <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No suppliers found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Suppliers;
