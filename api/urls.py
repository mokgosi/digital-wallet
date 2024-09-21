from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import ( TokenRefreshView, )

urlpatterns = [
    
    path('api/', views.AccountListReadOnly.as_view(), name='account-list-read-only'),
    path('api/accounts', views.AccountList.as_view(), name='account-list'),
    path('api/accounts/<int:account_number>', views.AccountRetrieveDestroy.as_view(), name='account-retrieve-destroy'),
    path('api/accounts/<int:account_number>/transactions', views.TransactionRetrieveUpdateDestroy.as_view(), name='account-transactions-retrieve-destroy'),
    
    path('api/users', views.UserList.as_view(), name='user-list'),
    # path('api/<str:username>', views.UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    
    path('api/transactions', views.TransactionList.as_view(), name='transactions-history-list'),
    
    path('api/token', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/register', views.RegisterUserView.as_view(), name='register-user-view'),
    path('api/login', views.LoginUserView.as_view(), name='login-user-view'),
    
    path('api/auth/', include('rest_framework.urls')),
    
    path('api/routes', views.getRoutes)
]