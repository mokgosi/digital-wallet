from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', views.UserList.as_view(), name='user-list'),
    path('api/accounts', views.AccountList.as_view(), name='account-list'),
    path('api/transactions', views.TransactionList.as_view(), name='transactions-history-list'),
    path('api/register', views.RegisterUserView.as_view(), name='register-user-view'),
    
]