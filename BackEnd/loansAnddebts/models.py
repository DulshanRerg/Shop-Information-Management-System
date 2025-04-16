from django.db import models
from django.conf import settings
from customers.models import Customer
from sales.models import Sale

class Loan(models.Model):
    """
    Represents an outstanding debt owed by a customer.
    """
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    related_sale = models.ForeignKey(Sale, on_delete=models.SET_NULL, null=True, blank=True)
    amount_owed = models.DecimalField(max_digits=10, decimal_places=2)
    date_issued = models.DateField(auto_now_add=True)
    is_settled = models.BooleanField(default=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.customer.name} owes {self.amount_owed}"

class Repayment(models.Model):
    """
    Represents a payment made toward a loan.
    """
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='repayments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateField(auto_now_add=True)
    received_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        # Reduce the loan balance on save
        self.loan.amount_owed -= self.amount_paid
        if self.loan.amount_owed <= 0:
            self.loan.amount_owed = 0
            self.loan.is_settled = True
        self.loan.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Repayment {self.amount_paid} on {self.date_paid}"
