from rest_framework import viewsets, permissions
from .models import Expense, ExpenseCategory
from .serializers import ExpenseSerializer, ExpenseCategorySerializer

class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    """
    API for managing expense categories.
    """
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API for managing individual expenses.
    """
    queryset = Expense.objects.all().order_by('-date')
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
