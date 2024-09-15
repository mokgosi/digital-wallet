from django.urls import path, include
from . import views

urlpatterns = [
    
    path('api/', views.AccountListReadOnly.as_view(), name='account-list-read-only'),
    path('api/accounts', views.AccountList.as_view(), name='account-list'),
    
    path('api/users', views.UserList.as_view(), name='user-list'),
    # path('api/<str:username>', views.UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    
    
    path('api/accounts/<int:account_number>', views.AccountRetrieveDestroy.as_view(), name='account-retrieve-destroy'),
    
    path('api/accounts/<int:account_number>/transactions', views.TransactionRetrieveUpdateDestroy.as_view(), name='account-transactions-retrieve-destroy'),
    
    path('api/transactions', views.TransactionList.as_view(), name='transactions-history-list'),
    
    path('api/register', views.RegisterUserView.as_view(), name='register-user-view'),
    # path('api/login', views.LoginUserView.as_view(), name='login-user-view'),
    path('api/auth/', include('rest_framework.urls')),
]