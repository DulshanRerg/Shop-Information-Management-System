
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Plus, 
  MoreVertical, 
  ArrowDown,
  ArrowUp,
  Calendar,
  User,
  TrendingUp
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample data
const loansData = [
  { id: 1, name: "Bank Loan", type: "Loan", amount: 15000.00, remainingAmount: 10500.00, interest: 5.5, dueDate: "May 15, 2025", status: "Active" },
  { id: 2, name: "Equipment Financing", type: "Loan", amount: 8000.00, remainingAmount: 4200.00, interest: 4.2, dueDate: "Jun 10, 2025", status: "Active" },
  { id: 3, name: "Business Line of Credit", type: "Loan", amount: 25000.00, remainingAmount: 15000.00, interest: 6.8, dueDate: "Jul 20, 2025", status: "Active" },
];

const debtsData = [
  { id: 1, name: "Supplier ABC", type: "Debt", amount: 4500.00, dueDate: "Apr 20, 2025", status: "Pending" },
  { id: 2, name: "Contractor Payment", type: "Debt", amount: 2300.00, dueDate: "Apr 30, 2025", status: "Pending" },
  { id: 3, name: "Maintenance Service", type: "Debt", amount: 850.00, dueDate: "May 05, 2025", status: "Pending" },
  { id: 4, name: "Utility Company", type: "Debt", amount: 560.00, dueDate: "Apr 15, 2025", status: "Overdue" },
];

const Debts = () => {
  const [activeTab, setActiveTab] = useState("loans");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Calculate totals
  const totalLoans = loansData.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const totalDebts = debtsData.reduce((sum, debt) => sum + debt.amount, 0);
  const totalLiabilities = totalLoans + totalDebts;
  
  // Filter data based on status
  const filteredLoans = statusFilter === "all" 
    ? loansData 
    : loansData.filter(loan => loan.status.toLowerCase() === statusFilter);
    
  const filteredDebts = statusFilter === "all" 
    ? debtsData 
    : debtsData.filter(debt => debt.status.toLowerCase() === statusFilter);
  
  // Status badge renderer
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Wallet className="mr-2 h-8 w-8" />
            Debts & Loans Management
          </h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Loans</span>
                <span className="text-3xl font-bold">${totalLoans.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">Remaining balance</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Debts</span>
                <span className="text-3xl font-bold">${totalDebts.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">Outstanding</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Liabilities</span>
                <span className="text-3xl font-bold">${totalLiabilities.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground mt-1">All obligations</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs and Filters */}
        <div className="space-y-4">
          <Tabs defaultValue="loans" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="debts">Debts</TabsTrigger>
              </TabsList>
              
              <Select 
                defaultValue="all"
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Loans Tab */}
            <TabsContent value="loans" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan Name</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <ArrowDown className="mr-2 h-4 w-4 text-green-600" />
                          Original Amount
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <ArrowUp className="mr-2 h-4 w-4 text-red-600" />
                          Remaining
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Interest Rate
                        </div>
                      </TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.length > 0 ? (
                      filteredLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.name}</TableCell>
                          <TableCell>${loan.amount.toFixed(2)}</TableCell>
                          <TableCell>${loan.remainingAmount.toFixed(2)}</TableCell>
                          <TableCell>{loan.interest}%</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {loan.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Make Payment</DropdownMenuItem>
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
                          No loans found matching your filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Debts Tab */}
            <TabsContent value="debts" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Creditor</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          <ArrowUp className="mr-2 h-4 w-4 text-red-600" />
                          Amount
                        </div>
                      </TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDebts.length > 0 ? (
                      filteredDebts.map((debt) => (
                        <TableRow key={debt.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              {debt.name}
                            </div>
                          </TableCell>
                          <TableCell>${debt.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {debt.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(debt.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
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
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No debts found matching your filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Debts;
