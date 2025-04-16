from rest_framework import viewsets, permissions
from .models import Category, Product, StockEntry
from .serializers import CategorySerializer, ProductSerializer, StockEntrySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for creating and managing product categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class StockEntryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for logging stock restocking.
    """
    queryset = StockEntry.objects.all()
    serializer_class = StockEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)
