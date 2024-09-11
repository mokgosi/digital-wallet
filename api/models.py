from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

import uuid

# Create your models here.
class User(AbstractUser):
    # uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(_("username"), max_length=150, blank=False, unique=True)
    email = models.EmailField(_("email address"), blank=False, unique=True)
    first_name = models.CharField(_("first name"), max_length=150, blank=False)
    last_name = models.CharField(_("last name"), max_length=150, blank=False)
    verified = models.BooleanField(_("verified"), default=False)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()
    
    def __str__(self) -> str:
        return str(f"{self.first_name} {self.last_name} - {self.email}")
    
    
class Account(models.Model): 
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    owner = models.ForeignKey('User', related_name='account', on_delete=models.CASCADE)
    account_number = models.PositiveIntegerField(unique=True)
    balance = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return str(f"{self.account_number} - {self.owner}")

    
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
    
class Transaction(models.Model):
    account = models.ForeignKey(Account, related_name='account', on_delete=models.CASCADE, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=100, choices=TRANSACTION_TYPES, null=True)
    status = models.CharField(max_length=100, choices=TRANSACTION_STATUSES)  
    date = models.DateField()
    
    creator = models.ForeignKey(Account, related_name='creator', on_delete=models.CASCADE, null=True)
    receiver = models.ForeignKey(Account, related_name='receiver', on_delete=models.CASCADE,  null=True)
    
    # REQUIRED_FIELDS = ['username']

    
    def __str__(self) -> str:
        return str(self.id)
    
    
    class Meta:
        verbose_name_plural = "Transactions"
            
    
    



