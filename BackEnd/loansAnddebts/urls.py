from rest_framework.routers import DefaultRouter
from .views import LoanViewSet, RepaymentViewSet

router = DefaultRouter()
router.register(r'loans', LoanViewSet)
router.register(r'repayments', RepaymentViewSet)

urlpatterns = router.urls
