from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class AccountSerializer(serializers.ModelSerial):
    class Meta:
        model = Account
        fileds = '__all__'
        
        
class TransactionHistorySerializer(serializers.ModelSerial):
    class Meta:
        model = TransactionHistory
        fields = '__all__'