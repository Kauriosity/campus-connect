import django_filters
from .models import Program

class ProgramFilter(django_filters.FilterSet):
    program_type = django_filters.CharFilter(field_name='program_type', lookup_expr='iexact')
    domain = django_filters.CharFilter(field_name='domain', lookup_expr='icontains')

    class Meta:
        model = Program
        fields = ['program_type', 'domain']
