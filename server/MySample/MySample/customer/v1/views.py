from lib2to3.pgen2 import driver
from multiprocessing import context
from rest_framework.serializers import Serializer
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
#change this later
from dashboard.models import Person
from customer.v1 import serializers
from rest_framework import status as request_status
from rest_framework.authtoken.models import Token
from dashboard.models import Customer
from rest_framework import authentication, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
 

class CustomersView(GenericAPIView):
    serializer_class = serializers.CustomersSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    queryset = Customer.objects.all()
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields={
        'isDeleted':['exact','iexact'],
        'dateregistered':['exact','iexact','lte','gte'],
        'address':['exact','iexact','contains'],
        'username':['exact','iexact','contains']
    }
    search_fields = ['username','firstName', 'lastName']
    
    """Create only if user is admin"""
    
    # add later
    # permission_classes = [IsNotAuthenticatedDenyGet]
    
    def post(self,request,user_id=None,format=None): 
        """No POST for single user query"""
        if user_id != None:
            return Response({'detail':'Method POST not allowed'},status=request_status.HTTP_405_METHOD_NOT_ALLOWED)
        
        """A new user signs up"""
        data = request.data
        if type(request.data) == dict:
            data = [data]
        serializer = self.serializer_class(data = data,many=True)
        if serializer.is_valid():
            serializer.save()
            
            """make a token here"""
            # user = Person.objects.get(username=serializer.validated_data.get('username'))
            # token:Token = Token.objects.create(user=user)
            # token_key = token.key
            
            """when token is availabel"""
            # return Response({"user":serializer.data,"token":token_key})

            return Response({"user":serializer.data})
        
        return Response(serializer.errors, status=request_status.HTTP_400_BAD_REQUEST)

    def get(self,request,user_id=None,format=None):
        
        """Get all users. Only allow if user is authenticated."""
        if user_id == None:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            serializer = self.serializer_class(page,many=True,context={'request':request})
            return self.get_paginated_response(serializer.data)
        
        return self.get_single_user(request,user_id)
    
    def get_single_user(self,request,user_id):
        response:Response = None
        user_exists,user_queryset = self.check_user_exists_with_user_id(user_id)
        if not user_exists:
            response = Response({"detail":"User does not exist"},status = request_status.HTTP_404_NOT_FOUND)
        else:
            """if user is authenticated show all filtered details, else send unauthorized access"""
            # if request.user.is_authenticated:
            #     queryset = self.filter_queryset(user_queryset)
            #     serializer = self.serializer_class(queryset.first(),context={'request':request})
            #     response = Response(serializer.data)    
            # else:
            #     response = Response({"detail":"Unauthorized Access"}, status=request_status.HTTP_401_UNAUTHORIZED)
            """used for testing"""
            queryset = self.filter_queryset(user_queryset)
            serializer = self.serializer_class(queryset.first(),context={'request':request})
            response = Response(serializer.data)
        return response
    
    def check_user_exists_with_user_id(self,user_id):
        exists = True
        user_queryset=None
        user_queryset = self.get_queryset().filter(id=user_id)
        if len(user_queryset) == 0:
            exists = False
        return exists,  user_queryset
    
    def patch(self,request,user_id=None,format=None):
        if user_id is None:
            return Response({'detail':'Method PATCH not allowed'},status=request_status.HTTP_405_METHOD_NOT_ALLOWED)
                
        response:Response = None
        user_exists,user_queryset = self.check_user_exists_with_user_id(user_id)
        if not user_exists:
            response = Response({"detail":"User does not exist"},status = request_status.HTTP_404_NOT_FOUND)
        else:
            user = user_queryset.first()
            serializer = serializers.CustomersSerializer(user,data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                response = Response(serializers.CustomersSerializer(user).data)
            else:
                response = Response(serializer.errors, status=request_status.HTTP_400_BAD_REQUEST)
        return response
    
    def put(self,request,user_id=None,format=None):
        data = request.data 
        if type(data) == dict:
            if 'id' not in data:
                data['id'] = user_id
            data=[data]
        valid_data=[]
        for d in data:
            if 'id' in d:
                valid_data.append(d)
        ids = []
        for d in valid_data:
            ids.append(d['id'])
        user_queryset = Customer.objects.filter(id__in=ids)
        response:Response=None
        if len(user_queryset) == 0:
            response = Response({"detail":"No user matching the specified id/s are found"},status = request_status.HTTP_404_NOT_FOUND)
        else:    
            serializer = serializers.CustomersSerializer(user_queryset,data=valid_data,many=True)
            if serializer.is_valid():
                serializer.save()
                response = Response(serializer.data)
            else:
                response = Response(serializer.errors, status=request_status.HTTP_400_BAD_REQUEST)
        return response

    def delete(self,request,user_id=None,format=None):
        data = request.data
        if type(data) == dict:
            data['id'] = user_id
            data=[data]
        valid_data=[]
        for d in data:
            if 'id' in d:
                valid_data.append(d)
        ids = []
        for d in valid_data:
            ids.append(d['id'])
        user_queryset = Customer.objects.filter(id__in=ids).update(isDeleted=True)
        message = str(user_queryset) + " Customer instance/s are deleted"
        
        return Response({"detail":message},status = request_status.HTTP_200_OK)


