from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username','is_superuser',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username','first_name','last_name','email', 'password','is_superuser')


class MarksSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Marks
        fields = '__all__'
        
       

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        depth = 1
        
    marks = MarksSerializer()
    def create(self, validated_data):
        marks = validated_data.pop('marks')
        
        for mark in marks:
            m = Marks.objects.create(**marks)
        student = Student.objects.create(**validated_data,marks=m)
        
        return student

    def update(self, instance, validated_data):
        marks = validated_data.pop('marks')
        print(instance)
        instance.name = validated_data.get('name',instance.name)
        instance.Roll_no = validated_data.get('Roll_no',instance.Roll_no)
        instance.Class = validated_data.get('Class',instance.Class)
        instance.City = validated_data.get('City',instance.City)
        instance.save()
        m = instance.marks
        m.physics = marks.get('physics',m.physics)
        m.chemistry = marks.get('chemistry',m.chemistry)
        m.maths = marks.get('maths',m.maths)
        m.save()

        return instance
        





      
