
import apiClient from './apiClient';
import { Sale } from '../types/models';

const salesService = {
  getSales: async (): Promise<Sale[]> => {
    const response = await apiClient.get('/sales/');
    return response.data;
  },
  
  getSaleById: async (id: number): Promise<Sale> => {
    const response = await apiClient.get(`/sales/${id}/`);
    return response.data;
  },
  
  createSale: async (saleData: Omit<Sale, 'id'>): Promise<Sale> => {
    const response = await apiClient.post('/sales/', saleData);
    return response.data;
  },
  
  updateSale: async (id: number, saleData: Partial<Sale>): Promise<Sale> => {
    const response = await apiClient.put(`/sales/${id}/`, saleData);
    return response.data;
  },
  
  deleteSale: async (id: number): Promise<void> => {
    await apiClient.delete(`/sales/${id}/`);
  },
};

export default salesService;
