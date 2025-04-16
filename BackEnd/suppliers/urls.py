from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, PurchaseViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'purchases', PurchaseViewSet)

urlpatterns = router.urls
