from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import *
from .serializers import *
from .forms import UserRegistrationForm
import random
from django.db.models import F

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    
    def post(self, request):
        account = Account.objects.create(
            account_number = random.randrange(11111111, 99999999),
            owner = User.objects.get(pk=request.data['owner']),
            balance = request.data['balance']
        )

        serializer = AccountSerializer(account)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    
    
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer    
    
    def post(self,request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            
            account = Account.objects.get(uuid=request.data['account'])
            transaction_amount = serializer.validated_data['amount']
            
            if account: 
                if request.data['transaction_type'] == 'Deposit':
                    
                    account.balance = account.balance + transaction_amount
                    account.save()
                    serializer.save()
                    return Response(status=status.HTTP_201_CREATED)
                
                elif request.data['transaction_type'] == 'Withdrawal': 
                      
                    if account.balance > transaction_amount:
                        account.balance = account.balance - transaction_amount
                        account.save()
                        serializer.save()
                        return Response(status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    
                elif request.data['transaction_type'] == 'Transfer':
                     
                    if account.balance > transaction_amount: 
                        account.balance = account.balance - transaction_amount
                        account.save()
                        serializer.save()
                        return Response(status=status.HTTP_201_CREATED)
                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)  
                      
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

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
    
    
    
    
    
    
    
    
    
    

def register(request):
    form = UserRegistrationForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            new_user = form.save()
            return redirect('accounts:register')
    return render(request, "accounts/register.html", context = {"form":form})



