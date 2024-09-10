from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import *
from .serializers import *
from .forms import UserRegistrationForm
import random

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    
    def post(self, request):
        account = Account.objects.create(
            account_number = random.randrange(1111111111, 9999999999),
            owner = User.objects.get(pk=request.data['owner']),
            balance = request.data['balance']
        )

        serializer = AccountSerializer(account)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    
    
    
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer    

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



