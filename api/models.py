from django.db import models
import uuid

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
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    owner = models.ForeignKey('User', related_name='account', on_delete=models.CASCADE)
    account_number = models.PositiveIntegerField(unique=True)
    balance = models.models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    
TRANSACTION_TYPES = (
    (DEPOSIT, "Deposit"),
    (WITHDRAWAL, "Withdrawal"),
    (TRANSFER, "Transfer"),
)

TRANSACTION_STATUSES = (
    (PENDING, "Pending"),
    (SUCCESS, "Success"),
    (FAIL, "Fail"),
)
    
class TransactionHistory(models.Model):
    account = models.ForeignKey(Account, related_name='transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(
        max_length=100,
        choices=TRANSACTION_TYPES)  
    status = models.CharField(
        max_length=100,
        choices=TRANSACTION_STATUSES)  
    date = models.DateField()
            
    
    



