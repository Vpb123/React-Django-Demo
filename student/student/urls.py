from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from studentd import views                            # add this

router = routers.DefaultRouter()                      # add this
router.register(r'studentd', views.StudentView, 'student')
router.register(r'marks', views.MarkView, 'marks')     # add this
     # add this

urlpatterns = [
    path('admin/', admin.site.urls),        
    path('api/', include(router.urls))                # add this
    ]