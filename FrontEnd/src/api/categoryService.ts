import apiClient from './apiClient';

export interface Category {
  id: number;
  name: string;
}

const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/inventory/categories/');
    return response.data;
  },
};

export default categoryService;
