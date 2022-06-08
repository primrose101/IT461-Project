from django.urls import path
from jwt_auth.v1 import views

urlpatterns = [
    path('v1/auth/token', views.CreateTokenView.as_view(), name='token'),
    path('v1/auth/verify', views.VerifyTokenView.as_view(), name='verify'),
]