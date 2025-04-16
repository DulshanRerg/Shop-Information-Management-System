
import apiClient from './apiClient';
import { User } from '../types/models';
import { toast } from '@/hooks/use-toast';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/accounts/login/', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed. Please try again.';
      toast({
        title: 'Login Failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<User> => {
    try {
      const response = await apiClient.post('/accounts/register/', credentials);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Registration failed. Please try again.';
      toast({
        title: 'Registration Failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout/');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token even if API call fails
      localStorage.removeItem('token');
    }
  },
  
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get('/auth/user/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;
