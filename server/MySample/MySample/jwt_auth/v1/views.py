from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
import datetime
from django.conf import settings
from customer.v1.serializers import CustomersSerializer
from dashboard.models import Customer
import json
from rest_framework import status as request_status

class CreateTokenView(APIView):
  def get(self, request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    username = body['username']
    password = body['password']
    token = JwtToken.create(username, password)
    if token:
      return Response({'token': token})
    else:
      return Response({'error': 'Invalid username or password.'}, status=request_status.HTTP_404_NOT_FOUND)

class VerifyTokenView(APIView):
  def get(self, request):
    #token = request.headers['Authorization']
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    token = body['token']
    return Response(JwtToken.verify(token))

class JwtToken:
  __KEY = settings.SECRET_KEY
  __ALGO = 'HS256'

  def create(username, password):
    customer = Customer.objects.filter(username=username, password=password)
    if customer:
      serializer = CustomersSerializer(customer, many=True) #serializer.data
      id = serializer.data[0]['id']
      payload = {
        'id': id,
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
      }
      token = jwt.encode(payload, JwtToken.__KEY, JwtToken.__ALGO)
      return token
    return None

  def verify(token):
    try:
        decoded_token = jwt.decode(token, JwtToken.__KEY, JwtToken.__ALGO)
    except jwt.ExpiredSignatureError:
        return {'detail': 'Token has expired.'}
    except jwt.InvalidTokenError:
        return {'detail': 'Token is invalid.'}
    return {'detail': 'Token is valid.'}

  def is_valid(token):
    try:
        jwt.decode(token, JwtToken.__KEY, JwtToken.__ALGO)
    except:
        return False
    return True

class JwtAuthorization:
  def is_authorized(request):
    authorization = {
      'is_authorized': False,
      'detail': "Token is required",
      'status': request_status.HTTP_401_UNAUTHORIZED
    }

    if 'Authorization' in request.headers:
      token = request.headers['Authorization']
      detail = JwtToken.verify(token)['detail']
      if JwtToken.is_valid(token):
        authorization['is_authorized'] = True
        authorization['status'] = request_status.HTTP_200_OK
      authorization['detail'] = detail
    
    return authorization