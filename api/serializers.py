from .models import *

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.reverse import reverse

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        
        
class AccountSerializer(serializers.ModelSerializer):
    
    # account_holder = UserSerializer()
    account_number = serializers.CharField(max_length=100, read_only=True)
    
    class Meta:
        model = Account
        fields = ['id', 'account_holder', 'account_number', 'balance', 'created', 'updated']
        depth = 1
  
  
class AccountReadOnlySerializer(serializers.ModelSerializer):

    account_number = serializers.CharField(max_length=100, read_only=True)
    transactions = serializers.SerializerMethodField(method_name='get_transactions')
    
    class Meta:
        model = Account
        fields = ['id', 'account_holder', 'account_number', 'balance', 'transactions', 'created', 'updated']
        depth = 1
        
    def get_transactions(self, obj):
        trasactions = Transaction.objects.filter(account=obj)
        return TransactionSerializer(trasactions , many=True).data
    
    
class TransactionSerializer(serializers.ModelSerializer):
    
    account = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()
    
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'transaction_type', 'status', 'account', 'receiver', 'date']
        # depth = 1        
        

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token        
        

class RegisterUserSerializer(serializers.ModelSerializer):
    
    confirm_password = serializers.CharField(max_length=100, write_only=True)
    
    class Meta:
        model = User 
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'], 
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user