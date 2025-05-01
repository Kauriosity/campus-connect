import django_filters
from .models import College

class CollegeFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = College
        fields = ['name', 'state', 'city']
