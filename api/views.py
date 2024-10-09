from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth import authenticate
from django.contrib.auth.models import User


from .models import *
from .serializers import *
from .forms import UserRegistrationForm

from django.db.models import F

import random
import json

# Create your views here.
@permission_classes([IsAuthenticatedOrReadOnly]) 
class UserList(generics.ListAPIView):
    """
    Returns a list of all users in the system.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
@permission_classes([IsAuthenticated]) 
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

@permission_classes([IsAuthenticated])
class AccountListReadOnly(generics.ListAPIView):
    """
    Returns a list of all accounts and users they belong to.
    Read-only accounts
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    
@permission_classes([IsAuthenticated])    
class AccountList(generics.ListCreateAPIView):
    """
    Returns a list of all accounts and users they belong to.
    Can also be used to retrieve and create accounts
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def post(self, request):
        
        account = Account.objects.create(
            account_number = random.randrange(11111111, 99999999), #can be improved
            account_holder = User.objects.get(pk=request.data['account_holder']),
            balance = request.data['balance'],
        )
        
        # initial deposit on account creation
        if(account):
            Transaction.objects.create(
                account = account,
                amount = account.balance,
                account_new_balance = account.balance,
                receiver_new_balance = None,
                description = "Initial account deposit",
                transaction_type = "Deposit",
                status = "Success"
            )

        serializer = AccountSerializer(account)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
@permission_classes([IsAuthenticated]) 
class AccountRetrieveDestroy(generics.RetrieveDestroyAPIView): 
    """
    Returns a sigle accounts and user they belong to.
    Can also be used to retrieve and delete account
    """
    queryset = Account.objects.all()
    serializer_class = AccountReadOnlySerializer
    lookup_field = 'account_number'
    
@permission_classes([IsAuthenticated])     
class TransactionRetrieveUpdateDestroy(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer 
    lookup_field = 'account.account_number'
    
@permission_classes([IsAuthenticated])    
class TransactionList(generics.ListCreateAPIView):
    """
    Returns a list of transactions.
    Can also be used to retrieve and create transactions
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]   
    
    def post(self,request, *args, **kwargs):
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            
            account = Account.objects.get(pk=request.data['account'])
            transaction_amount = serializer.validated_data['amount']
            
            serializer.validated_data['account'] = account
            
            if account: 
                if request.data['transaction_type'] == 'Deposit':
                    
                    account.balance = account.balance + transaction_amount
                    account.save()
                    transaction.account_new_balance = account.balance
                    transaction = serializer.save()
                    return  Response(
                        {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                        status=status.HTTP_201_CREATED)
                
                elif request.data['transaction_type'] == 'Withdrawal': 
                      
                    if account.balance > transaction_amount:
                        account.balance = account.balance - transaction_amount
                        account.save()
                        transaction.account_new_balance = account.balance #current account balance 
                        transaction = serializer.save()
                        return  Response(
                            {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                            status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    
                elif request.data['transaction_type'] == 'Transfer':
                    
                    if account.balance > transaction_amount: 
                        account.balance = account.balance - transaction_amount  #current account balance
                        account.save()
                        
                        # get account amount money being transferred to
                        receiver = Account.objects.get(id=request.data['receiver'])
                        serializer.validated_data['receiver'] = receiver
                        
                        receiver.balance = receiver.balance + transaction_amount
                        receiver.save()
                        
                        transaction.account_new_balance = account.balance
                        transaction.receiver_new_balance = receiver.balance
                        transaction = serializer.save()
                        
                        return  Response(
                            {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                            status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)  
                      
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class RegisterUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {'user': UserSerializer(user, context=self.get_serializer_context()).data}, 
                status=status.HTTP_201_CREATED) 
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginUserView(APIView):
    
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Login Fail: Invalid credentials'}, status=401)
    
    
@api_view(['GET'])
def endPoints(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
        '/api/login',
        '/api/users',
        '/api/accounts',
        '/api/accounts/<int:account_number>',
        '/api/accounts/<int:account_number>/transactions',
        '/api/transactions',
    ]
    return Response(routes)    
    
    
    

# def register(request):
#     form = UserRegistrationForm(request.POST or None)
#     if request.method == 'POST':
#         if form.is_valid():
#             new_user = form.save()
#             return redirect('accounts:register')
#     return render(request, "accounts/register.html", context = {"form":form})