from django.urls import path
from .views import RegisterUserView, LoginView
from .views import UserProfileView
from .views import LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),  # Profile API
    # path('signup/', RegisterUserView.as_view(), name='signup'),
    # path('login/', LoginView.as_view(), name='login'),
    # path('profile/', UserProfileView.as_view(), name='profile'),  
    path('logout/', LogoutView.as_view(), name='logout'), 
    path('register/', RegisterUserView.as_view(), name='register'),
    # path('login/', obtain_auth_token, name='login'),
    # path('register/', RegisterUserView.as_view(), name='register'),
]