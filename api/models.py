from django.db import models
from django.contrib.auth.models import User, AbstractUser
import uuid

# Create your models here.
class User(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.user.username
    
    
class Account(models.Model): 
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    owner = models.ForeignKey('User', related_name='account', on_delete=models.CASCADE)
    account_number = models.PositiveIntegerField(unique=True)
    balance = models.DecimalField(
        default=0.00, 
        max_digits=10, 
        decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return str(f"{self.user.username}: {self.account_number}")

    
TRANSACTION_TYPES = (
    ("Deposit", "Deposit", ),
    ("Withdrawal", "Withdrawal"),
    ("Transfer", "Transfer"),
)

TRANSACTION_STATUSES = (
    ("Pending", "Pending"),
    ("Success", "Success"),
    ("Fail", "Fail"),
)
    
class TransactionHistory(models.Model):
    initiator_account = models.ForeignKey(
        Account, 
        related_name='initiator', 
        on_delete=models.CASCADE)
    destination_account = models.ForeignKey(
        Account, 
        related_name='destination', 
        on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(
        max_length=100,
        choices=TRANSACTION_TYPES)  
    status = models.CharField(
        max_length=100,
        choices=TRANSACTION_STATUSES)  
    date = models.DateField()
    
    def __str__(self) -> str:
        return str(self.id)
    
    
    class Meta:
        verbose_name_plural = "Transaction History"
            
    
    



