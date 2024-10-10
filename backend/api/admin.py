from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['account_holder', 'account_number', 'balance', 'created']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['account', 'receiver', 'amount', 'transaction_type', 'status', 'date']
    list_filter = ("status","transaction_type")
    list_per_page = 25
    search_fields = ['status', 'initiator_account']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['last_name', 'first_name', 'username', 'email']

