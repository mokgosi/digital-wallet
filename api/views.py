from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

from .models import *
from .serializers import *
from .forms import UserRegistrationForm

from django.db.models import F

import random

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def post(self, request):
        account = Account.objects.create(
            account_number = random.randrange(11111111, 99999999),
            account_holder = User.objects.get(pk=request.data['account_holder']),
            balance = request.data['balance']
        )

        serializer = AccountSerializer(account)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class AccountRetrieveDestroy(generics.RetrieveDestroyAPIView): 
    queryset = Account.objects.all()
    serializer_class = AccountReadOnlySerializer
    lookup_field = 'account_number'
    
    
class TransactionRetrieveUpdateDestroy(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer 
    lookup_field = 'account.account_number'
    
    
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer 
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]   
    
    def post(self,request, *args, **kwargs):
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            
            account = Account.objects.get(pk=request.data['account'])
            transaction_amount = serializer.validated_data['amount']
            
            serializer.validated_data['account'] = account
            
            
            print(serializer.validated_data)
            
            if account: 
                if request.data['transaction_type'] == 'Deposit':
                    
                    account.balance = account.balance + transaction_amount
                    account.save()
                    transaction = serializer.save()
                    return  Response(
                        {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                        status=status.HTTP_201_CREATED)
                
                elif request.data['transaction_type'] == 'Withdrawal': 
                      
                    if account.balance > transaction_amount:
                        account.balance = account.balance - transaction_amount
                        account.save()
                        transaction = serializer.save()
                        return  Response(
                            {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                            status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    
                elif request.data['transaction_type'] == 'Transfer':
                    
                    if account.balance > transaction_amount: 
                        account.balance = account.balance - transaction_amount
                        account.save()
                        
                        # get account amount money being transferred to
                        receiver = Account.objects.get(id=request.data['receiver'])
                        serializer.validated_data['receiver'] = receiver
                        
                        receiver.balance = receiver.balance + transaction_amount
                        receiver.save()
                        
                        transaction = serializer.save()
                        
                        return  Response(
                            {'transaction': TransactionSerializer(transaction, context=self.get_serializer_context()).data}, 
                            status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)  
                      
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RegisterUserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    # permission_classes = (permissions.AllowAny,)
    
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
            return Response({'error': 'Invalid credentials'}, status=401)
    
    
    
    
    
    
    

# def register(request):
#     form = UserRegistrationForm(request.POST or None)
#     if request.method == 'POST':
#         if form.is_valid():
#             new_user = form.save()
#             return redirect('accounts:register')
#     return render(request, "accounts/register.html", context = {"form":form})



