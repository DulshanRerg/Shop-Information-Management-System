
import apiClient from './apiClient';
import { Product } from '../types/models';

const inventoryService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get('/inventory/products/');
    return response.data;
  },
  
  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/inventory/products/${id}/`);
    return response.data;
  },
  
  createProduct: async (productData: Omit<Product, 'id' | 'status'>): Promise<Product> => {
    const response = await apiClient.post('/inventory/products/', productData);
    return response.data;
  },
  
  updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put(`/inventory/products/${id}/`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/inventory/products/${id}/`);
  },
};

export default inventoryService;
