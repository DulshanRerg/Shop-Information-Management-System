from django.db import models
from django.conf import settings
from inventory.models import Product

class Supplier(models.Model):
    """
    Represents a vendor or supplier.
    """
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Purchase(models.Model):
    """
    Represents a stock purchase from a supplier.
    """
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_cost = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    received_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        # Increase product stock when a purchase is recorded
        self.product.quantity_in_stock += self.quantity
        self.product.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Restocked {self.product.name} x{self.quantity} from {self.supplier.name}"
