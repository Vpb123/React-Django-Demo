from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import StudentSerializer,MarksSerializer      # add this
from .models import Student,Marks                    # add this

class StudentView(viewsets.ModelViewSet):       # add this
    serializer_class = StudentSerializer         # add this
    queryset = Student.objects.all() 

class MarkView(viewsets.ModelViewSet):       # add this
    serializer_class = MarksSerializer        # add this
    queryset = Marks.objects.all()   