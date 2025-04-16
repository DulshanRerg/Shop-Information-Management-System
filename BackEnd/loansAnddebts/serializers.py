from rest_framework import serializers
from .models import Loan, Repayment

class RepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repayment
        fields = '__all__'
        read_only_fields = ['date_paid', 'received_by']

class LoanSerializer(serializers.ModelSerializer):
    repayments = RepaymentSerializer(many=True, read_only=True)
    customer_name = serializers.ReadOnlyField(source='customer.name')

    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = ['date_issued', 'created_by', 'is_settled']
