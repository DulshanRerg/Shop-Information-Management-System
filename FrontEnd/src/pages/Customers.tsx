
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone,
  UserPlus
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

// Sample customer data
const initialCustomerData = [
  { id: 1, name: "Jane Cooper", email: "jane@example.com", phone: "555-1234", status: "Active", totalSpent: 1240.50, lastPurchase: "Apr 10, 2025" },
  { id: 2, name: "Wade Warren", email: "wade@example.com", phone: "555-2345", status: "Active", totalSpent: 890.25, lastPurchase: "Apr 8, 2025" },
  { id: 3, name: "Esther Howard", email: "esther@example.com", phone: "555-3456", status: "Inactive", totalSpent: 430.00, lastPurchase: "Mar 25, 2025" },
  { id: 4, name: "Cameron Williamson", email: "cameron@example.com", phone: "555-4567", status: "Active", totalSpent: 2100.75, lastPurchase: "Apr 11, 2025" },
  { id: 5, name: "Brooklyn Simmons", email: "brooklyn@example.com", phone: "555-5678", status: "Active", totalSpent: 760.50, lastPurchase: "Apr 5, 2025" },
  { id: 6, name: "Leslie Alexander", email: "leslie@example.com", phone: "555-6789", status: "Inactive", totalSpent: 350.25, lastPurchase: "Feb 20, 2025" },
  { id: 7, name: "Robert Fox", email: "robert@example.com", phone: "555-7890", status: "Active", totalSpent: 1680.00, lastPurchase: "Apr 9, 2025" },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomerData);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  // Calculate stats
  const activeCustomers = customers.filter(c => c.status === "Active").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageSpend = totalRevenue / customers.length;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-2 h-8 w-8" />
            Customer Management
          </h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Customers</span>
                <span className="text-3xl font-bold">{customers.length}</span>
                <span className="text-sm text-muted-foreground mt-1">{activeCustomers} active</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                <span className="text-3xl font-bold">${totalRevenue.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">From all customers</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Average Spend</span>
                <span className="text-3xl font-bold">${averageSpend.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">Per customer</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search customers..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            Filter
          </Button>
        </div>
        
        {/* Customers Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Last Purchase</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={customer.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>{customer.lastPurchase}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No customers found matching your search
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

export default Customers;
