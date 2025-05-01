from django.urls import path
from . import views
from .views import LoginView

urlpatterns = [
    path('hello/', views.hello_api),
    path('login/', LoginView.as_view(), name='login'),
]
