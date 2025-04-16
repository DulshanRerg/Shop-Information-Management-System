from django.db import models
from django.conf import settings
from customers.models import Customer
from inventory.models import Product

class Sale(models.Model):
    """
    Represents a complete sales transaction.
    """
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    sale_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    paid = models.BooleanField(default=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Sale #{self.pk} - {self.total_amount}"

class SaleItem(models.Model):
    """
    Represents an individual item sold in a sale.
    """
    sale = models.ForeignKey(Sale, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_total(self):
        return self.quantity * self.unit_price

    def save(self, *args, **kwargs):
        # Update product stock when sale item is saved
        if self.product and self.quantity:
            self.product.quantity_in_stock -= self.quantity
            self.product.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
