
// Common types
export interface BaseModel {
  id: number;
  created_at?: string;
  updated_at?: string;
}

// Account types
export interface User extends BaseModel {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_staff: boolean;
}

// Product/Inventory types
export interface Product extends BaseModel {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description: string;
}

// Customer types
export interface Customer extends BaseModel {
  name: string;
  email: string;
  phone: string;
  status: string;
  totalSpent: number;
  lastPurchase: string;
}

// Sales types
export interface Sale extends BaseModel {
  customer: number | Customer;
  products: Array<{productId: number, quantity: number, price: number}>;
  totalAmount: number;
  date: string;
  status: string;
  paymentMethod: string;
}

// Supplier types
export interface Supplier extends BaseModel {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

// Expense types
export interface Expense extends BaseModel {
  description: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: string;
}

// Loan & Debt types
export interface Loan extends BaseModel {
  name: string;
  type: string;
  amount: number;
  remainingAmount: number;
  interest: number;
  dueDate: string;
  status: string;
}

export interface Debt extends BaseModel {
  name: string;
  type: string;
  amount: number;
  dueDate: string;
  status: string;
}
