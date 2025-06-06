from rest_framework import viewsets
from .models import Pizza
from .serializers import PizzaSerializer

class PizzaViewSet(viewsets.ModelViewSet):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
