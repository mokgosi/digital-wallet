from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email= models.EmailField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.username
    
    
class Account(models.Model):    
    account_number = models.PositiveIntegerField(unique=True)
    balance = models.models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    owner = models.ForeignKey('User', related_name='account', on_delete=models.CASCADE)
    
    
class Withdrawal(models.Model):
    amount = models.FloatField()
    account = models.ForeignKey('Account', related_name='accounts', on_delete=models.CASCADE)
    
    
class Deposit(models.Model):
    amount = models.FloatField()
    account = models.ForeignKey('Account', related_name='accounts', on_delete=models.CASCADE)
    
class Transfers(models.Model):
    amount = models.FloatField()
    
TRANSACTION_TYPES = (
    (DEPOSIT, "Deposit"),
    (WITHDRAWAL, "Withdrawal"),
    (TRANSFER, "Transfer"),
)
    
class TransactionHistory(models.Model):
    account = models.ForeignKey(Account, related_name='transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.PositiveSmallIntegerField(choices=TRANSACTION_TYPES)  
            
    
    



