from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    """
    Registration form for new users with role selection.
    """
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'role', 'password1', 'password2')

class LoginForm(AuthenticationForm):
    """
    Login form using Django's authentication system.
    """
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
