from django.http import Http404
from django.shortcuts import render, redirect, reverse
from django.views.generic import View, ListView, DetailView
from django.db import transaction
from django.http import HttpResponse
from django.contrib import messages
from datetime import datetime
from .forms import ProductForm, PurchaseForm
from .forms import CustomerForm
from .models import Customer
from .models import Person
from .models import *

# Create your views here.
class DashboardCustomerView(ListView):
    template_name = 'customer.html'
    context_object_name = 'object_list'

    def get_queryset(self):
        return Customer.objects.filter(isDeleted=False)
        return len(date_register)

    def post(self, request):
        if request.method == 'POST':
            if 'btnUpdate' in request.POST:
                custID = request.POST.get("id")
                firstname = request.POST.get("firstname")
                lastname = request.POST.get("lastname") 
                date_register =  request.POST.get("date_register")
                address = request.POST.get("address")
                date_bday = request.POST.get("date_bday")   
                birthplace = request.POST.get("birthplace") 
                email = request.POST.get("email") 
                username = request.POST.get("username") 
                password = request.POST.get("password") 
                contact = request.POST.get("contact") 
                update_customer = Customer.objects.filter(person_ptr_id = custID).update(firstname = firstname, lastname = lastname, dateregistered = date_register,
                                                                                                    address = address, birthdate = date_bday, birthplace = birthplace, 
                                                                                                    email = email, username = username, contact = contact)
                
                
            elif 'btnBuy' in request.POST:
                custID = request.POST.get("id")
                request.session['custID'] = custID
                return redirect('dashboard:buy')

            elif 'btnDelete' in request.POST:
                print('delete button clicked')
                custID = request.POST.get("id")
                del_person = Person.objects.filter(id = custID).update(isDeleted=True)
                print('record deleted')
        return redirect('dashboard:customer')

class DashboardCustomerRegistrationView(View):
    def get(self,request):
        return render(request, 'customer_register.html')
    
    def post(self, request):
        form = CustomerForm(request.POST, request.FILES)
        if form.is_valid():
            firstname = request.POST.get("firstname")   
            lastname = request.POST.get("lastname") 
            date_register =  request.POST.get("date_register")
            address = request.POST.get("address")
            date_bday = request.POST.get("date_bday")   
            birthplace = request.POST.get("birthplace") 
            email = request.POST.get("email") 
            username = request.POST.get("username") 
            password = request.POST.get("password") 
            contact = request.POST.get("contact") 
            form = Customer(firstname = firstname, lastname = lastname, dateregistered = date_register, address = address, 
                            birthdate = date_bday, birthplace = birthplace, email = email, username = username, password = password,
                            contact = contact)

            form.save()
            return redirect('dashboard:customer')
        
        return render(request, 'customer_register.html')

class DashboardProductView(View):
    def get(self,request):
        dash_prod = Product.objects.filter(isDeleted=False)
        context = {
            'products' : dash_prod
        }
        return render(request,'product.html', context)

    def post(self, request):
        if request.method == 'POST':    
            if 'btnUpdate' in request.POST: 
                print('update profile button clicked')
                pid = request.POST.get("prod-id")           
                ctgry = request.POST.get("prod-category")
                brnd = request.POST.get("prod-brand")
                pname = request.POST.get("prod-name")
                psize = request.POST.get("prod-size")
                pprice = request.POST.get("prod-price")
                pstocks = request.POST.get("prod-stocks")
                #pimage = request.POST.get("prod-image")
                update_prod = Product.objects.filter(id = pid).update(category = ctgry, brand = brnd, name = pname, size = psize, price =pprice,
                                      stocks = pstocks)#image = pimage)
                print(update_prod)
                print('profile updated')
                messages.success(
                    request,
                    "Product successfully updated.",
                    extra_tags="primary",
                )
            elif 'btnDelete' in request.POST:   
                print('delete button clicked')
                pid = request.POST.get("pprod-id")
                prod = Product.objects.filter(id=pid).update(isDeleted=True)
                print('recorded deleted')
                messages.success(
                    request, 
                    "Product successfully removed.", 
                    extra_tags="danger"
                )
            elif 'btnAdd' in request.POST:
                return redirect('dashboard:register_view')
        #return HttpResponse ('post')
        return redirect('dashboard:product_view')
		

class ProductRegistrationView(View):
    def get(self,request):
        return render(request, 'registerprod.html')
    def post(self, request):    
        if request.method == 'POST':    
            form = ProductForm(request.POST, request.FILES)     

            if form.is_valid():
                form.save()
                messages.success(
                     request,
                     "Product successfully recorded!",
                      extra_tags="primary"
                )
                #return HttpResponse('Product record saved!')           
                #return render(request,'recorded.html')
                # except:
                #   raise Http404
            else:
                print(form.errors)
                return HttpResponse('not valid')
        return redirect('dashboard:product_view')

class BuyView(View):
    def get(self,request):
        dash_prod = Product.objects.all()
        context = {
            'products' : dash_prod
        }
        return render(request,'buy.html', context)

    def post(self, request):
        if request.method == 'POST':
            if 'btnPurchase' in request.POST:
                cid = request.session.get('cid')
                count = OrderItems.objects.all().count()
                count = count + 1
                form = PurchaseForm(request.POST)

                if form.is_valid():
                    pId = request.POST.get("prod-id")
                    quantity = request.POST.get("prod-quantity")

                    form = OrderItems(customer_id = cid, product_id = pId, quantity = quantity)
                    form.save()

                    purchase = OrderItems.objects.all()
                    loop = 0
                    temp_id = 0
                    for pur in purchase:
                        loop = loop + 1
                        if loop == count:
                            temp_id = pur.id
                            break
                    
                    stocks = Product.objects.get(id = pId).stocks
                    num = OrderItems.objects.get(id = temp_id).quantity
                    temp = stocks - num
                    if temp >= 0:
                        update_product = Product.objects.filter(id = pId).update(stocks = temp)
                    else:
                        update_product = Product.objects.filter(id = pId).update(stocks = stocks)
                        delete_product = OrderItems.objects.filter(id = temp_id).delete()
                    
                    print('>>>>>>>>>>>>>>>>>>>>>>> VALiD FORM / STORED >>>>>>>>>>>>>>')
                    print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                    messages.success(
                         request,
                         "Product successfully bought!",
                          extra_tags="primary"
                    )

                else:
                    print('>>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>')
                    print(form.errors)
                    print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')   
        return redirect('dashboard:buy')

