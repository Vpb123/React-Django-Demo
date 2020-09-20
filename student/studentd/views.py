from django.shortcuts import render
from rest_framework import viewsets 
from django.contrib.auth.models import User 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly        # add this
from .serializers import StudentSerializer,MarksSerializer,UserSerializer,UserSerializerWithToken      # add this
from .models import Student,Marks                    # add this
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class StudentView(viewsets.ModelViewSet):       # add this
    serializer_class = StudentSerializer         # add this
    queryset = Student.objects.all() 
    # authentication_classes = [TokenAuthentication, ]
    # permission_classes = [IsAuthenticated, ]

class MarkView(viewsets.ModelViewSet):       # add this
    serializer_class = MarksSerializer        # add this
    queryset = Marks.objects.all()   



