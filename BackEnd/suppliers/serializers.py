from rest_framework import serializers
from .models import Supplier, Purchase

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
        read_only_fields = ['created_by']

class PurchaseSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    supplier_name = serializers.ReadOnlyField(source='supplier.name')

    class Meta:
        model = Purchase
        fields = '__all__'
        read_only_fields = ['date', 'received_by']
