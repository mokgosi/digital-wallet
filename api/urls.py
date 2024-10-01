from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import ( TokenRefreshView, )

urlpatterns = [
    
    path('', views.routes, name='routes'),
    path('accounts', views.AccountList.as_view(), name='account-list'),
    path('accounts-readonly', views.AccountListReadOnly.as_view(), name='account-list-read-only'),
    path('accounts/<int:account_number>', views.AccountRetrieveDestroy.as_view(), name='account-retrieve-destroy'),
    path('accounts/<int:account_number>/transactions', views.TransactionRetrieveUpdateDestroy.as_view(), name='account-transactions-retrieve-destroy'),
    
    path('users', views.UserList.as_view(), name='user-list'),
    # path('<str:username>', views.UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    
    path('transactions', views.TransactionList.as_view(), name='transactions-history-list'),
    
    path('token', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('register', views.RegisterUserView.as_view(), name='register-user-view'),
    path('login', views.LoginUserView.as_view(), name='login-user-view'),
    
    path('auth/', include('rest_framework.urls')),
]