from rest_framework import viewsets, permissions
from .models import Supplier, Purchase
from .serializers import SupplierSerializer, PurchaseSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    """
    API to manage supplier records.
    """
    queryset = Supplier.objects.all().order_by('name')
    serializer_class = SupplierSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class PurchaseViewSet(viewsets.ModelViewSet):
    """
    API to manage product purchases from suppliers.
    """
    queryset = Purchase.objects.all().order_by('-date')
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(received_by=self.request.user)
