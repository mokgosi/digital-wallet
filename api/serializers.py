from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
     
    account_number = serializers.CharField(max_length=100, read_only=True)   
        
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        
        
        
class RegisterUserSerializer(serializers.ModelSerializer):
    
    confirm_password = serializers.CharField(max_length=100, read_only=True)
    
    class Meta:
        model = User 
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password', '']
        extra_kwargs = {'password': {'write_only': True}}
        
        def create(self, validated_data):
            user = User.objects.create_user(
                username=validated_data['username'], 
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                password=validated_data['password']
            )
            return user