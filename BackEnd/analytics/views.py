from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Count

from sales.models import Sale
from expenses.models import Expense
from customers.models import Customer
from loansAnddebts.models import Loan
from inventory.models import Product

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    """
    Returns summary metrics for dashboard analytics.
    """
    today = timezone.now().date()

    total_sales = Sale.objects.filter(sale_date__date=today).aggregate(
        total=Sum('total_amount'))['total'] or 0

    total_expenses = Expense.objects.filter(date=today).aggregate(
        total=Sum('amount'))['total'] or 0

    profit = total_sales - total_expenses

    customer_count = Customer.objects.count()
    product_count = Product.objects.count()

    total_loans = Loan.objects.filter(is_settled=False).aggregate(
        total=Sum('amount_owed'))['total'] or 0

    return Response({
        "sales_today": total_sales,
        "expenses_today": total_expenses,
        "profit_today": profit,
        "customers": customer_count,
        "products": product_count,
        "outstanding_loans": total_loans
    })
