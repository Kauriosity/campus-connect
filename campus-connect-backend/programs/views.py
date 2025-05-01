from django.shortcuts import render

# Create your views here
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from .models import Program
from .serializers import ProgramSerializer
from .filters import ProgramFilter

# List all programs or create a new program
class ProgramListCreateView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    filterset_class = ProgramFilter
    ordering_fields = ['fees', 'duration', 'name']



# Retrieve, update, or delete a specific program
class ProgramDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class ProgramListView(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['college', 'duration']

