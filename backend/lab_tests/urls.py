from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LabTestCatalogViewSet, LabTestOrderViewSet

router = DefaultRouter()
router.register(r'catalog', LabTestCatalogViewSet, basename='lab-catalog')
router.register(r'orders', LabTestOrderViewSet, basename='lab-orders')

urlpatterns = [
    path('', include(router.urls)),
]
