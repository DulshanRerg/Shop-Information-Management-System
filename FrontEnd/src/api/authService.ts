
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
  password2: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Add a fallback mechanism to handle development environment
const handleNetworkError = (error: any, actionType: string) => {
  console.error(`${actionType} error:`, error);
  
  // Check if it's a network error (likely backend not running)
  if (error.code === 'ERR_NETWORK') {
    // If in development mode, we can simulate success for testing frontend
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
      toast({
        title: 'Development Mode',
        description: `Backend connection failed, but ${actionType} simulated for development.`,
        variant: 'default',
      });
      
      return true; // Indicate we're handling this error as success
    }
  }
  
  // For other errors, show the error toast
  const message = error.response?.data?.detail || 
                 (error.response?.data && typeof error.response.data === 'object' 
                  ? Object.entries(error.response.data)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')
                  : `${actionType} failed. Please try again.`);
                 
  toast({
    title: `${actionType} Failed`,
    description: message,
    variant: 'destructive',
  });
  
  return false; // Not handled as success
};

const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/accounts/login/', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      // For network errors in development, simulate successful login
      if (handleNetworkError(error, 'Login')) {
        const mockUser: User = {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          is_active: true,
          is_staff: false,
        };
        
        const mockResponse: LoginResponse = {
          token: 'dev-token-' + Date.now(),
          user: mockUser
        };
        
        localStorage.setItem('token', mockResponse.token);
        return mockResponse;
      }
      
      throw error;
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<User> => {
    try {
      console.log('Sending registration data:', credentials);
      const response = await apiClient.post('/accounts/register/', credentials);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', error.response?.data);
      
      // For network errors in development, simulate successful registration
      if (handleNetworkError(error, 'Registration')) {
        const mockUser: User = {
          id: 1,
          username: credentials.username,
          email: credentials.email,
          is_active: true,
          is_staff: false,
        };
        
        return mockUser;
      }
      
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/accounts/logout/');
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
      const response = await apiClient.get('/accounts/user/');
      return response.data;
    } catch (error: any) {
      // For network errors in development, return mock user if token exists
      if (error.code === 'ERR_NETWORK' && localStorage.getItem('token')) {
        if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
          // Extract username from token (assuming dev token format)
          const mockUser: User = {
            id: 1,
            username: 'devuser',
            email: 'devuser@example.com',
            is_active: true,
            is_staff: false,
          };
          
          return mockUser;
        }
      }
      
      throw error;
    }
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;