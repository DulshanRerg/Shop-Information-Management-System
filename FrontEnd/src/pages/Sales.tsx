import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  Printer, 
  Search, 
  Plus, 
  X,
  Package 
} from 'lucide-react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const productsData = [
  { id: 1, name: "Office Chair Deluxe", price: 199.99, category: "Furniture" },
  { id: 2, name: "Standing Desk Pro", price: 349.99, category: "Furniture" },
  { id: 3, name: "Wireless Keyboard", price: 59.99, category: "Electronics" },
  { id: 4, name: "Ergonomic Mouse", price: 39.99, category: "Electronics" },
  { id: 5, name: "Monitor 27\"", price: 299.99, category: "Electronics" },
  { id: 6, name: "Desk Lamp", price: 29.99, category: "Office Supplies" },
  { id: 7, name: "Notebook Set", price: 12.99, category: "Stationery" },
  { id: 8, name: "Whiteboard", price: 89.99, category: "Office Supplies" },
  { id: 9, name: "Printer Paper", price: 19.99, category: "Stationery" },
  { id: 10, name: "Filing Cabinet", price: 149.99, category: "Furniture" },
];

const recentTransactions = [
  { id: "INV-001", customer: "Jane Cooper", date: "Apr 13, 2025", amount: 445.00, status: "Completed" },
  { id: "INV-002", customer: "Wade Warren", date: "Apr 13, 2025", amount: 125.00, status: "Completed" },
  { id: "INV-003", customer: "Esther Howard", date: "Apr 12, 2025", amount: 248.00, status: "Completed" },
  { id: "INV-004", customer: "Cameron Williamson", date: "Apr 12, 2025", amount: 199.99, status: "Completed" },
  { id: "INV-005", customer: "Brooklyn Simmons", date: "Apr 11, 2025", amount: 175.00, status: "Completed" },
];

const Sales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const addToCart = (product: { id: number; name: string; price: number }) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity } 
        : item
    ));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;
  
  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <ShoppingCart className="mr-2 h-8 w-8" />
            Sales Management
          </h1>
        </div>
        
        <Tabs defaultValue="pos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pos">Point of Sale</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pos" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Products */}
              <div className="col-span-2 space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => addToCart(product)}>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full h-24 bg-secondary rounded-md mb-3 flex items-center justify-center">
                          <Package className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Cart */}
              <div className="col-span-1 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Current Cart</h3>
                      <Button variant="outline" size="sm" onClick={clearCart} disabled={cart.length === 0}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                    
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between pb-2 border-b">
                            <div className="space-y-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <span className="sr-only">Decrease</span>
                                <span>-</span>
                              </Button>
                              <span className="text-sm w-4 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <span className="sr-only">Increase</span>
                                <span>+</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tax (7%)</span>
                            <span>${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 space-y-2">
                          <Button className="w-full">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Process Payment
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Printer className="mr-2 h-4 w-4" />
                            Print Receipt
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                  <h3 className="font-semibold text-lg">Recent Transactions</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search transactions..." className="pl-8 w-full" />
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Invoice
                    </Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Sales;
