from pytz import timezone
from rest_framework import serializers
from dashboard.models import Customer
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
    
class CustomersSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = Customer
        fields = '__all__'
        list_serializer_class = UpdateListSerializer

