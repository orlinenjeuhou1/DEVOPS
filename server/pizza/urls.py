from rest_framework.routers import DefaultRouter
from .views import PizzaViewSet

from django.urls import path, include

router = DefaultRouter()
router.register(r'pizzas', PizzaViewSet, basename='pizza')

urlpatterns = [
    path('', include(router.urls)),
]
