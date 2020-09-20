from rest_framework import routers
from .api import StudentViewSet,UserViewSet

router=routers.DefaultRouter()
router.register('api/studentd',StudentViewSet,'studentd')
router.register('')
urlpatterns = router.urls