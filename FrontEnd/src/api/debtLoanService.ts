
import apiClient from './apiClient';
import { Loan, Debt } from '../types/models';

const debtLoanService = {
  // Loans
  getLoans: async (): Promise<Loan[]> => {
    const response = await apiClient.get('/loans/');
    return response.data;
  },
  
  getLoanById: async (id: number): Promise<Loan> => {
    const response = await apiClient.get(`/loans/${id}/`);
    return response.data;
  },
  
  createLoan: async (loanData: Omit<Loan, 'id'>): Promise<Loan> => {
    const response = await apiClient.post('/loans/', loanData);
    return response.data;
  },
  
  updateLoan: async (id: number, loanData: Partial<Loan>): Promise<Loan> => {
    const response = await apiClient.put(`/loans/${id}/`, loanData);
    return response.data;
  },
  
  deleteLoan: async (id: number): Promise<void> => {
    await apiClient.delete(`/loans/${id}/`);
  },
  
  // Debts
  getDebts: async (): Promise<Debt[]> => {
    const response = await apiClient.get('/debts/');
    return response.data;
  },
  
  getDebtById: async (id: number): Promise<Debt> => {
    const response = await apiClient.get(`/debts/${id}/`);
    return response.data;
  },
  
  createDebt: async (debtData: Omit<Debt, 'id'>): Promise<Debt> => {
    const response = await apiClient.post('/debts/', debtData);
    return response.data;
  },
  
  updateDebt: async (id: number, debtData: Partial<Debt>): Promise<Debt> => {
    const response = await apiClient.put(`/debts/${id}/`, debtData);
    return response.data;
  },
  
  deleteDebt: async (id: number): Promise<void> => {
    await apiClient.delete(`/debts/${id}/`);
  },
};

export default debtLoanService;
