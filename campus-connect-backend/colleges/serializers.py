from rest_framework import serializers
from .models import College

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'  # ✅ Includes all fields from the College model

