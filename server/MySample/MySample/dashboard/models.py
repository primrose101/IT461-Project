from django.db import models
#from django.db.models import Model
from datetime import datetime

# Create your models here.

class Product(models.Model):
    datereg = models.DateField(auto_now_add=True)
    category = models.CharField(max_length = 100)
    name = models.CharField(max_length = 100)
    brand = models.CharField(max_length = 100)
    size = models.CharField(max_length = 50)
    color = models.CharField(max_length = 50)
    stocks = models.IntegerField(max_length = 5)
    price = models.FloatField(max_length = 50)
    description = models.CharField(max_length = 10000)
    image = models.ImageField(upload_to='images', null=True, blank=True)
    isDeleted = models.BooleanField(default=False)

    class Meta:
        db_table = "Product"

class Person(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    dateregistered = models.DateField(auto_now_add=True)
    address = models.CharField(max_length=100)
    birthdate = models.DateField(default = datetime.now())
    birthplace = models.CharField(max_length=100)
    isDeleted = models.BooleanField(default=False)
    
    class Meta:
        db_table = "Person"

class Customer(Person):
    email = models.EmailField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    contact = models.CharField(max_length=11)

    class Meta:
        db_table = "Customer"


class OrderItems(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null= True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null= True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    class Meta:
        db_table = "OrderItems"
    
    