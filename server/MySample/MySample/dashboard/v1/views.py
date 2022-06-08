from urllib import response
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from dashboard.models import Product,OrderItems
from dashboard.v1 import serializers
from rest_framework import status as request_status
from rest_framework.authtoken.models import Token
from rest_framework import authentication, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser,FormParser,JSONParser
from django.http.request import QueryDict

class ProductsView(GenericAPIView):
    serializer_class = serializers.ProductsSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    queryset = Product.objects.all()
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    filterset_fields={
        'isDeleted':['exact','iexact'],
        'datereg':['exact','iexact','lte','gte'],
        'name':['exact','iexact','contains'],
        'category':['exact','iexact','contains'],
        'brand':['exact','iexact','contains'],
        'price':['lte','gte'],
        'stocks':['lte','gte'],
    }
    search_fields = ['name','brand', 'category']
    
    """Create only if user is admin"""
    
    # add later
    # permission_classes = [IsNotAuthenticatedDenyGet]
    
    def post(self,request,product_id=None,format=None): 
        """No POST for single product query"""
        if product_id != None:
            return Response({'detail':'Method POST not allowed'},status=request_status.HTTP_405_METHOD_NOT_ALLOWED)
        
        """Create new product/s"""
        data = request.data
        if type(request.data) == QueryDict:
            data = [data]
        response_data = []
        response_errors = []
        response:Response = None
    
        for d in data:    
            serializer = self.serializer_class(data = d)
            if not serializer.is_valid():
                response_errors.append(serializer.errors)
        if len(response_errors) >0:
            response = Response(response_errors,status=request_status.HTTP_400_BAD_REQUEST)
        else:
            for d in data:
                serializer = self.serializer_class(data = d)
                serializer.is_valid()
                serializer.save()
                response_data.append(serializer.data)
            response = Response(response_data)        
        return response
    
    def get(self,request,product_id=None,format=None):
        
        """Get all users. Only allow if user is authenticated."""
        if product_id == None:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            serializer = self.serializer_class(page,many=True,context={'request':request})
            return self.get_paginated_response(serializer.data)
        
        return self.get_single_product(request,product_id)
    
    def get_single_product(self,request,product_id):
        response:Response = None
        product_exists,product_queryset = self.check_product_exists_with_product_id(product_id)
        if not product_exists:
            response = Response({"detail":"Product does not exist"},status = request_status.HTTP_404_NOT_FOUND)
        else:
            """if user is authenticated show all filtered details, else send unauthorized access"""
            # if request.user.is_authenticated:
            #     queryset = self.filter_queryset(user_queryset)
            #     serializer = self.serializer_class(queryset.first(),context={'request':request})
            #     response = Response(serializer.data)    
            # else:
            #     response = Response({"detail":"Unauthorized Access"}, status=request_status.HTTP_401_UNAUTHORIZED)
            """used for testing"""
            queryset = self.filter_queryset(product_queryset)
            serializer = self.serializer_class(queryset.first(),context={'request':request})
            response = Response(serializer.data)
        return response
    
    def check_product_exists_with_product_id(self,user_id):
        exists = True
        product_queryset=None
        product_queryset = self.get_queryset().filter(id=user_id)
        if len(product_queryset) == 0:
            exists = False
        return exists,  product_queryset
    
    def patch(self,request,product_id=None,format=None):
        if product_id is None:
            return Response({'detail':'Method PATCH not allowed'},status=request_status.HTTP_405_METHOD_NOT_ALLOWED)
                
        response:Response = None
        product_exists,product_queryset = self.check_product_exists_with_product_id(product_id)
        if not product_exists:
            response = Response({"detail":"Product does not exist"},status = request_status.HTTP_404_NOT_FOUND)
        else:
            product = product_queryset.first()
            serializer = serializers.ProductsSerializer(product,data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                response = Response(serializers.ProductsSerializer(product).data)
            else:
                response = Response(serializer.errors, status=request_status.HTTP_400_BAD_REQUEST)
        return response
    
    def put(self,request,product_id=None,format=None):
        data = request.data
        if type(request.data) == QueryDict:
            data = data.dict()
            if 'id' not in data:
                data['id'] = product_id
            data = [data]
        response_data = []
        response_errors = []
        response:Response = None
        valid_products=[]
        valid_data=[]
        
        for d in data:
            if type(d) == QueryDict:
                d = d.dict()
            if 'id' in d:
                product_exist,product_queryset = self.check_product_exists_with_product_id(d['id'])
                if product_exist:
                    valid_data.append(d)
                    valid_products.append(product_queryset.first())
        
        for idx,d in enumerate(valid_data):    
            serializer = serializers.ProductsSerializer(valid_products[idx],data = d)
            if not serializer.is_valid():
                response_errors.append(serializer.errors)
        
        if len(response_errors) > 0:
            response = Response(response_errors,status=request_status.HTTP_400_BAD_REQUEST)
        
        else:
            for idx, d in enumerate(valid_data):
                serializer = self.serializer_class(valid_products[idx],data = d)
                serializer.is_valid()
                serializer.save()
                response_data.append(serializer.data)
            response = Response(response_data)        
        return response

    def delete(self,request,product_id=None,format=None):
        data = request.data
        if type(data) == dict:
            if 'id' not in data:
                data['id'] = product_id
            data=[data]
        valid_data=[]
        for d in data:
            if 'id' in d:
                valid_data.append(d)
        ids = []
        for d in valid_data:
            ids.append(d['id'])
        product_queryset = Product.objects.filter(id__in=ids).update(isDeleted=True)
        message = str(product_queryset) + " Product instance/s are deleted"
        
        return Response({"detail":message},status = request_status.HTTP_200_OK)

class OrdersView(GenericAPIView):
    """For this only post, delete and get are implemented."""
    
    serializer_class = serializers.OrdersSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    queryset = OrderItems.objects.all()
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields={
        'product':['exact'],
        'customer':['exact'],
    }
    
    """Create only if user is admin"""
    
    def post(self,request,order_id=None,format=None): 
        """No POST for single query"""
        if order_id != None:
            return Response({'detail':'Method POST not allowed'},status=request_status.HTTP_405_METHOD_NOT_ALLOWED)
        
        """A new user signs up"""
        data = request.data
        if type(request.data) == dict:
            data = [data]
        serializer = self.serializer_class(data = data,many=True)
        if serializer.is_valid():
            serializer.save()
            
            return Response({"product":serializer.data})
        
        return Response(serializer.errors, status=request_status.HTTP_400_BAD_REQUEST)

    def get(self,request,order_id=None,format=None):
        
        """Get all users. Only allow if user is authenticated."""
        if order_id == None:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            serializer = self.serializer_class(page,many=True,context={'request':request})
            return self.get_paginated_response(serializer.data)
        
        return self.get_single_oder(request,order_id)
    
    def get_single_oder(self,request,order_id):
        response:Response = None
        order_exists,order_queryset = self.check_order_exists_with_order_id(order_id)
        if not order_exists:
            response = Response({"detail":"Order does not exist"},status = request_status.HTTP_404_NOT_FOUND)
        else:
            queryset = self.filter_queryset(order_queryset)
            serializer = self.serializer_class(queryset.first(),context={'request':request})
            response = Response(serializer.data)
        return response
    
    def check_order_exists_with_order_id(self,order_id):
        exists = True
        order_queryset=None
        order_queryset = self.get_queryset().filter(id=order_id)
        if len(order_queryset) == 0:
            exists = False
        return exists,  order_queryset

    def delete(self,request,order_id=None,format=None):
        data = request.data
        if type(data) == dict:
            data['id'] = order_id
            data=[data]
        valid_data=[]
        for d in data:
            if 'id' in d:
                valid_data.append(d)
        ids = []
        for d in valid_data:
            ids.append(d['id'])
        order_queryset = OrderItems.objects.filter(id__in=ids).delete()
        message = str(order_queryset[0]) + " Order instance/s are deleted"
        
        return Response({"detail":message},status = request_status.HTTP_200_OK)


