from rest_framework import serializers
from .models import Sale, SaleItem
from inventory.models import Product

class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = SaleItem
        fields = ('id', 'product', 'product_name', 'quantity', 'unit_price')

class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)

    class Meta:
        model = Sale
        fields = ('id', 'customer', 'user', 'sale_date', 'total_amount', 'paid', 'notes', 'items')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        sale = Sale.objects.create(**validated_data)

        total = 0
        for item_data in items_data:
            item = SaleItem.objects.create(sale=sale, **item_data)
            total += item.get_total()

        sale.total_amount = total
        sale.save()
        return sale
