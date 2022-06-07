from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .v1 import views as v1Views

app_name = 'dashboard'
urlpatterns = [
    path('product', views.DashboardProductView.as_view(), name="product_view"),
    path('product/register', views.ProductRegistrationView.as_view(), name="register_view"),
    path('customer/', views.DashboardCustomerView.as_view(), name="customer"),
    path('customer/registration', views.DashboardCustomerRegistrationView.as_view(), name="customer_view"),
    path('buy/', views.BuyView.as_view(), name="buy"),
    
    path('v1/products',v1Views.ProductsView.as_view()),
    path('v1/products/<str:product_id>',v1Views.ProductsView.as_view()),
    path('v1/orders',v1Views.OrdersView.as_view()),
    path('v1/orders/<str:order_id>',v1Views.OrdersView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
