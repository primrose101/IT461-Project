from django.contrib import admin
from .models import Product, Customer, OrderItems

admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(OrderItems)
