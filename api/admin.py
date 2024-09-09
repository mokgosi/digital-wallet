from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    pass

@admin.register(TransactionHistory)
class TransactionHistoryAdmin(admin.ModelAdmin):
    list_filter = ("status","transaction_type")
    list_per_page = 25
    search_fields = ['status', 'initiator_account']
    pass

