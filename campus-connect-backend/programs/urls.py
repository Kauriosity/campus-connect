from django.urls import path
from .views import ProgramListCreateView, ProgramDetailView
from .views import ProgramListView

urlpatterns = [
    path('', ProgramListCreateView.as_view(), name='program-list-create'),
    path('<int:pk>/', ProgramDetailView.as_view(), name='program-detail'),
    path('', ProgramListView.as_view(), name='program-list'),
    path('programs/', ProgramListCreateView.as_view(), name='program-list-create'),
    path('', ProgramListCreateView.as_view(), name='program-list-create'),
]
