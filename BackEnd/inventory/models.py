from django.db import models
from django.conf import settings

class Category(models.Model):
    """
    Represents a product category (e.g., Electronics, Grocery).
    """
    name = models.CharField(max_length=100, unique=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    Represents a product item.
    """
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_in_stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class StockEntry(models.Model):
    """
    Represents stock increase logs (e.g., purchases/restocking).
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stock_entries')
    quantity_added = models.PositiveIntegerField()
    date_added = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        # Auto update product stock quantity
        self.product.quantity_in_stock += self.quantity_added
        self.product.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} +{self.quantity_added} on {self.date_added}"
