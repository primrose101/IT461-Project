from rest_framework.views import APIView
from rest_framework.response import Response
import jwt
import datetime
from django.conf import settings
from customer.v1.serializers import CustomersSerializer
from dashboard.models import Customer
import json

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
      return Response({'error': 'Invalid username or password.'})

class VerifyTokenView(APIView):
  def get(self, request):
    token = request.headers['Authorization']
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
        return {'expired': 'Token has expired.'}
    except jwt.InvalidTokenError:
        return {'invalid': 'Token is invalid.'}
    return {'valid': 'Token is valid.'}

  def is_valid(token):
    try:
        jwt.decode(token, JwtToken.__KEY, JwtToken.__ALGO)
    except:
        return False
    return True