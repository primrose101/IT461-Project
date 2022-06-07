from django.urls import path
from django.views.generic import View, TemplateView
from . import views 
from .v1 import views as v1Views

app_name = 'landing'

urlpatterns = [
    path('index/', views.CustomerIndexView.as_view(), name="index_view"),
    path('registration/', views.CustomerRegistrationView.as_view(), name="registration_view"),
    path('v1/customers/', v1Views.CustomersView.as_view()),
    path('v1/customers/<str:user_id>',v1Views.CustomersView.as_view()),
    
    # path('dashboard/', views.CustomerDashboardView.as_view(), name="index_view"),

]