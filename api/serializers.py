from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import *

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
    
    
        
        
class AccountTransactionsHuperlink(serializers.HyperlinkedIdentityField):
    view_name = 'account-transactions'
    queryset = Account.objects.all()
    
    def get_url(self, obj, view_name, request, format):
        url_kwargs = {
            'acount_number': obj.account.account_number,    
        }
        return reverse(view_name, kwargs=url_kwargs, request=request, format=format)

    def get_object(self, view_name, view_args, view_kwargs):
        lookup_kwargs = {
           'account_number': view_kwargs['accoutn_number'],
        }
        return self.get_queryset().get(**lookup_kwargs)
     
        

        
        
        
class RegisterUserSerializer(serializers.ModelSerializer):
    
    confirm_password = serializers.CharField(max_length=100, read_only=True)
    
    class Meta:
        model = User 
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
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