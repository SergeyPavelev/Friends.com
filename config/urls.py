from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),  # Django Admin Panel
    path('', include("main.urls")),
    path('messenger/im/', include("messenger.urls")),
    path('auth/', include("register.urls", namespace='auth')),
]