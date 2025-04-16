
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Search, 
  Plus, 
  MoreVertical, 
  Calendar,
  FileText,
  CreditCard,
  ArrowUpDown
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

// Sample expense data
const initialExpenseData = [
  { id: 1, description: "Office Rent", category: "Rent", amount: 1200.00, date: "Apr 01, 2025", paymentMethod: "Bank Transfer", status: "Paid" },
  { id: 2, description: "Utility Bills", category: "Utilities", amount: 345.75, date: "Apr 05, 2025", paymentMethod: "Credit Card", status: "Paid" },
  { id: 3, description: "New Office Supplies", category: "Supplies", amount: 567.50, date: "Apr 12, 2025", paymentMethod: "Credit Card", status: "Pending" },
  { id: 4, description: "Staff Salaries", category: "Salaries", amount: 4500.00, date: "Apr 15, 2025", paymentMethod: "Bank Transfer", status: "Scheduled" },
  { id: 5, description: "Software Subscriptions", category: "Software", amount: 199.99, date: "Apr 10, 2025", paymentMethod: "Credit Card", status: "Paid" },
  { id: 6, description: "Marketing Campaign", category: "Marketing", amount: 1250.00, date: "Apr 08, 2025", paymentMethod: "Credit Card", status: "Paid" },
];

// Category options
const expenseCategories = [
  "All Categories",
  "Rent",
  "Utilities",
  "Supplies",
  "Salaries",
  "Software",
  "Marketing",
  "Travel",
  "Other"
];

// Payment method options
const paymentMethods = [
  "All Methods",
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "Other"
];

// Status options
const statusOptions = [
  "All Statuses",
  "Paid",
  "Pending",
  "Scheduled"
];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenseData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  
  // Filter expenses based on search and filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || expense.category === categoryFilter;
    const matchesStatus = statusFilter === "All Statuses" || expense.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Calculate stats
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = expenses
    .filter(exp => exp.status === "Paid")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses
    .filter(exp => exp.status === "Pending" || exp.status === "Scheduled")
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <DollarSign className="mr-2 h-8 w-8" />
            Expense Management
          </h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
                <span className="text-3xl font-bold">${totalExpenses.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">All expenses</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Paid</span>
                <span className="text-3xl font-bold">${paidExpenses.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">Already paid</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Pending/Scheduled</span>
                <span className="text-3xl font-bold">${pendingExpenses.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">To be paid</span>
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
              placeholder="Search expenses..." 
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
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              defaultValue="All Statuses"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Expenses Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <span>Date</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    <span>Amount</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {expense.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        {expense.paymentMethod}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
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
                    No expenses found matching your filters
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

export default Expenses;
