from rest_framework import serializers
from .models import *




        

class MarksSerializer(serializers.ModelSerializer):
    # student = serializers.PrimaryKeyRelatedField( queryset=Student.objects.all())
    # student = StudentSerializer( )
    class Meta:
        model = Marks
        fields = '__all__'
        
       

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        depth = 1
        
    # marks = serializers.PrimaryKeyRelatedField( queryset=Marks.objects.all())
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
        instance.regno = validated_data.get('regno',instance.regno)
        instance.address = validated_data.get('address',instance.address)
        instance.mobile = validated_data.get('mobile',instance.mobile)
        instance.save()
        m = instance.marks
        m.physics = marks.get('physics',m.physics)
        m.chemistry = marks.get('chemistry',m.chemistry)
        m.maths = marks.get('maths',m.maths)
        m.save()

        return instance
        





      
