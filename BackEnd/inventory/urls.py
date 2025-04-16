from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, StockEntryViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'stock-entries', StockEntryViewSet)

urlpatterns = router.urls
