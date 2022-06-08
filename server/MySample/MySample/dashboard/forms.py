from django import forms
from .models import Customer
from .models import Person
from .models import *

class ProductForm(forms.ModelForm):
	
	class Meta:
		model = Product
		fields = ('category', 'name', 'brand', 'size', 'color', 'stocks', 'price', 'description', 'image')

class CustomerForm(forms.ModelForm):
    
    class Meta:
        model = Customer
        fields = ('firstname', 'lastname',)

class PurchaseForm(forms.ModelForm):
    
    class Meta:
        model = OrderItems
        fields = ('quantity',)