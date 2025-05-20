
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from "sonner";
import ProductDialog from '@/components/inventory/ProductDialog';
import { ProductFormValues } from '@/components/inventory/ProductForm';
import InventoryHeader from '@/components/inventory/InventoryHeader';
import SearchAndFilters from '@/components/inventory/SearchAndFilters';
import ProductList from '@/components/inventory/ProductList';
import { getProductStatus, Product } from '@/components/inventory/inventoryUtils';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useInventory';

const Inventory = () => {
  // API data and mutations
  const { data: apiProducts, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Product dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormValues | undefined>(undefined);

  // Use API data if available, otherwise fall back to local state for development
  const inventoryData = apiProducts || [];

  // Filter data based on search and filters
  const filteredData = inventoryData.filter((product) => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || 
                           product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    // Status filter
    const matchesStatus = statusFilter === "all" || 
                         product.status.toLowerCase().replace(/\s+/g, '-') === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Add a new product
  const handleAddProduct = (values: ProductFormValues) => {
    createProduct.mutate({
      name: values.name,
      category: values.category,
      price: values.price,
      stock: values.stock,
      description: values.description || "",
    });
    setIsAddDialogOpen(false);
  };

  // Edit a product
  const handleEditProduct = (values: ProductFormValues) => {
    if (!currentProduct?.id) return;
    
    updateProduct.mutate({
      id: currentProduct.id,
      data: {
        name: values.name,
        category: values.category,
        price: values.price,
        stock: values.stock,
        description: values.description || "",
      }
    });
    setIsEditDialogOpen(false);
  };

  // Delete a product
  const handleDeleteProduct = (productId: number) => {
    deleteProduct.mutate(productId);
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <InventoryHeader onAddProduct={() => setIsAddDialogOpen(true)} />
        
        <SearchAndFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <ProductList 
          products={filteredData}
          onEditProduct={openEditDialog}
          onDeleteProduct={handleDeleteProduct}
          isLoading={isLoading}
        />
      </div>

      {/* Add Product Dialog */}
      <ProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddProduct}
        title="Add New Product"
      />

      {/* Edit Product Dialog */}
      <ProductDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditProduct}
        product={currentProduct}
        title="Edit Product"
      />
    </Layout>
  );
};

export default Inventory;
