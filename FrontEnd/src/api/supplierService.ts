
import apiClient from './apiClient';
import { Supplier } from '../types/models';

const supplierService = {
  getSuppliers: async (): Promise<Supplier[]> => {
    const response = await apiClient.get('/suppliers/');
    return response.data;
  },
  
  getSupplierById: async (id: number): Promise<Supplier> => {
    const response = await apiClient.get(`/suppliers/${id}/`);
    return response.data;
  },
  
  createSupplier: async (supplierData: Omit<Supplier, 'id'>): Promise<Supplier> => {
    const response = await apiClient.post('/suppliers/', supplierData);
    return response.data;
  },
  
  updateSupplier: async (id: number, supplierData: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.put(`/suppliers/${id}/`, supplierData);
    return response.data;
  },
  
  deleteSupplier: async (id: number): Promise<void> => {
    await apiClient.delete(`/suppliers/${id}/`);
  },
};

export default supplierService;
