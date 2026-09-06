from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),

    # OpenAPI Schema & Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # API Modules
    path('api/v1/auth/', include('users.urls')),
    path('api/v1/patients/', include('patients.urls')),
    path('api/v1/doctors/', include('doctors.urls')),
    path('api/v1/appointments/', include('appointments.urls')),
    path('api/v1/medical-records/', include('medical_records.urls')),
    path('api/v1/prescriptions/', include('prescriptions.urls')),
    path('api/v1/medicines/', include('medicines.urls')),
    path('api/v1/billing/', include('billing.urls')),
    path('api/v1/notifications/', include('notifications.urls')),
    path('api/v1/dashboard/', include('dashboard.urls')),
    path('api/v1/beds/', include('beds.urls')),
    path('api/v1/lab-tests/', include('lab_tests.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
