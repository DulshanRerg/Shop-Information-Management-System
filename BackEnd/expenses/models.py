from django.db import models
from django.conf import settings

class ExpenseCategory(models.Model):
    """
    Categories of expenses (e.g., Utilities, Rent, Wages).
    """
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Expense(models.Model):
    """
    Represents an operational expense with category and amount.
    """
    category = models.ForeignKey(ExpenseCategory, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.category.name}: {self.amount} on {self.date}"
