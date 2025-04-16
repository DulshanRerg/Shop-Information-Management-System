
import apiClient from './apiClient';
import { Expense } from '../types/models';

const expenseService = {
  getExpenses: async (): Promise<Expense[]> => {
    const response = await apiClient.get('/expenses/');
    return response.data;
  },
  
  getExpenseById: async (id: number): Promise<Expense> => {
    const response = await apiClient.get(`/expenses/${id}/`);
    return response.data;
  },
  
  createExpense: async (expenseData: Omit<Expense, 'id'>): Promise<Expense> => {
    const response = await apiClient.post('/expenses/', expenseData);
    return response.data;
  },
  
  updateExpense: async (id: number, expenseData: Partial<Expense>): Promise<Expense> => {
    const response = await apiClient.put(`/expenses/${id}/`, expenseData);
    return response.data;
  },
  
  deleteExpense: async (id: number): Promise<void> => {
    await apiClient.delete(`/expenses/${id}/`);
  },
};

export default expenseService;
