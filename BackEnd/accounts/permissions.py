from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Allows access only to users with 'admin' role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'

class IsStaff(BasePermission):
    """
    Allows access only to users with 'staff' role.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'staff'
