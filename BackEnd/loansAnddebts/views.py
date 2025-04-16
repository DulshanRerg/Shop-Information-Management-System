from rest_framework import viewsets, permissions
from .models import Loan, Repayment
from .serializers import LoanSerializer, RepaymentSerializer

class LoanViewSet(viewsets.ModelViewSet):
    """
    API to manage customer loans.
    """
    queryset = Loan.objects.all().order_by('-date_issued')
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class RepaymentViewSet(viewsets.ModelViewSet):
    """
    API to manage loan repayments.
    """
    queryset = Repayment.objects.all().order_by('-date_paid')
    serializer_class = RepaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(received_by=self.request.user)
