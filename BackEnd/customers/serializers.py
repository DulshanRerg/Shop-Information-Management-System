from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for customer data.
    """
    class Meta:
        model = Customer
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by']
