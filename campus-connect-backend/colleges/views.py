from django.shortcuts import render
from rest_framework import generics
from .models import College
from .serializers import CollegeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import CollegeFilter



# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import College
from .serializers import CollegeSerializer

class CollegeListView(APIView):
    def get(self, request):
        colleges = College.objects.all()
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CollegeDetailView(APIView):
    def get(self, request, college_id):
        try:
            college = College.objects.get(id=college_id)
            serializer = CollegeSerializer(college)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except College.DoesNotExist:
            return Response({"error": "College not found"}, status=status.HTTP_404_NOT_FOUND)

class CollegeListCreateView(generics.ListCreateAPIView):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class CollegeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CollegeFilter
