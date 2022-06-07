from jsonschema import ValidationError
from numpy import product
from pytz import timezone
from rest_framework import serializers
from dashboard.models import Product,OrderItems
from  django.utils import timezone

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        request = self.context.get('request')
        print(request)

        if request:
            fields = request.query_params.get('fields')
            if fields:
                fields = fields.split(',')
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)

class UpdateListSerializer(serializers.ListSerializer):
  
    def update(self, instances, validated_data):
      
        instance_hash = {index: instance for index, instance in enumerate(instances)}

        result = [
            self.child.update(instance_hash[index], attrs)
            for index, attrs in enumerate(validated_data)
        ]

        return result
    
class ProductsSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = '__all__'

class OrdersSerializer(DynamicFieldsModelSerializer,serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = '__all__'
        list_serializer_class = UpdateListSerializer

    def validate(self, attrs):
        stock = attrs['product'].stocks
        if stock - attrs['quantity'] < 0:
            raise serializers.ValidationError("Product stocks is insufficient for order quantity")
        return attrs
      
    def create(self, validated_data):
        ret = super().create(validated_data)
        product = validated_data['product']
        Product.objects.filter(id=product.id).update(stocks=product.stocks-validated_data['quantity'])
        return ret
