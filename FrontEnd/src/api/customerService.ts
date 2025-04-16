
import apiClient from './apiClient';
import { Customer } from '../types/models';

const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await apiClient.get('/customers/');
    return response.data;
  },
  
  getCustomerById: async (id: number): Promise<Customer> => {
    const response = await apiClient.get(`/customers/${id}/`);
    return response.data;
  },
  
  createCustomer: async (customerData: Omit<Customer, 'id' | 'totalSpent' | 'lastPurchase'>): Promise<Customer> => {
    const response = await apiClient.post('/customers/', customerData);
    return response.data;
  },
  
  updateCustomer: async (id: number, customerData: Partial<Customer>): Promise<Customer> => {
    const response = await apiClient.put(`/customers/${id}/`, customerData);
    return response.data;
  },
  
  deleteCustomer: async (id: number): Promise<void> => {
    await apiClient.delete(`/customers/${id}/`);
  },
};

export default customerService;
