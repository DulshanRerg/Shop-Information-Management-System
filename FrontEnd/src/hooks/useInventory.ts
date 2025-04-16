
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import inventoryService from '../api/inventoryService';
import { Product } from '../types/models';
import { toast } from 'sonner';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: inventoryService.getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => inventoryService.getProductById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: inventoryService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create product');
      console.error(error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => 
      inventoryService.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update product');
      console.error(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: inventoryService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete product');
      console.error(error);
    },
  });
};
