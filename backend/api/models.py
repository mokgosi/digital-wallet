from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

import uuid

# Create your models here.
class User(AbstractUser):
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
    account_holder = models.ForeignKey('User', related_name='account_holder', on_delete=models.CASCADE)
    account_number = models.PositiveIntegerField(unique=True)
    balance = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return str(f"{self.account_number}")

    
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
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=100, choices=TRANSACTION_TYPES)
    status = models.CharField(max_length=100, choices=TRANSACTION_STATUSES)  
    date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100, blank=True)
    
    # sender/account performing transaction
    account = models.ForeignKey('Account', related_name='account', on_delete=models.PROTECT) 
    # receiver/account receiving transfer
    receiver = models.ForeignKey('Account', related_name='receiver', on_delete=models.PROTECT,  null=True)
    
    account_new_balance = models.DecimalField(blank=True, max_digits=10, decimal_places=2) # balance after transaction 
    receiver_new_balance = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2) # balance after transaction 
    
    REQUIRED_FIELDS = ['account']
    
    def __str__(self) -> str:
        return str(self.id)
    
    class Meta:
        verbose_name_plural = "Transactions"