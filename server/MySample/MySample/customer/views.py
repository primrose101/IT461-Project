from django.shortcuts import render
from django.views.generic import View

# Create your views here.
class CustomerIndexView(View):
    def get(self, request):
        return render(request, 'customer/index.html')

    def post(self, request):
        return render(request, 'customer/customer_register.html')

class CustomerRegistrationView(View):
    def get(self, request):
        return render(request, 'customer/customer_register.html')

# class CustomerDashboardView(View):
#     def get(self, request):
#         return render(request, 'customer/registertable.html')
