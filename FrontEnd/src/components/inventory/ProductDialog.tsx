
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm, { ProductFormValues } from './ProductForm';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  product?: ProductFormValues;
  title: string;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  title,
}) => {
  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
