from rest_framework import routers
from .api import StudentViewSet

router=routers.DefaultRouter()
router.register('api/studentd',StudentViewSet,'studentd')

urlpatterns = router.urls