from rest_framework import serializers
from .models import Expense, ExpenseCategory

class ExpenseCategorySerializer(serializers.ModelSerializer):
    """
    Serializer for expense categories.
    """
    class Meta:
        model = ExpenseCategory
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    """
    Serializer for individual expense entries.
    """
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['user', 'date']
