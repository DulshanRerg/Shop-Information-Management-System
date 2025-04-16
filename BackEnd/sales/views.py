from rest_framework import viewsets, permissions
from .models import Sale
from .serializers import SaleSerializer

class SaleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing sales.
    """
    queryset = Sale.objects.all().order_by('-sale_date')
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
