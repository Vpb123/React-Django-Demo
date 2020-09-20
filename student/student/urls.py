from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from studentd import views                            # add this
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()    
# router.register(r'users', views.UserViewSet, 'users')                   # add this
router.register(r'studentd', views.StudentView, 'student')
router.register(r'marks', views.MarkView, 'marks') 
    # add this
     # add this

urlpatterns = [
    path('admin/', admin.site.urls),        
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view())
#     path('st/', include('core.urls'))
#     path('api-auth/', include('rest_framework.urls')),
#     path('studentd/rest-auth/', include('rest_auth.urls')),                # add this
    ]