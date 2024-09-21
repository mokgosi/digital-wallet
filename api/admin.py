from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    pass

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_filter = ("status","transaction_type")
    list_per_page = 25
    search_fields = ['status', 'initiator_account']
    pass

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

