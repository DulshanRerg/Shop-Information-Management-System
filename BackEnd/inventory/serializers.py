from rest_framework import serializers
from .models import Category, Product, StockEntry

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model.
    """
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = '__all__'

class StockEntrySerializer(serializers.ModelSerializer):
    """
    Serializer for StockEntry model.
    """
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = StockEntry
        fields = '__all__'
