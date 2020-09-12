from rest_framework import serializers
from .models import *

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
        





      
