from django.core.exceptions import ValidationError
from django.core.validators import validate_email, validate_unicode_slug
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from users.views import send_confirmation_email
from djangoreact.serializers import UserSerializer


def authenticate_with_email(email, password):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None
    else:
        if user.check_password(password):
            return user

    return None


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = authenticate_with_email(email, password)

        if user is not None:
            if (user.user_profile.email_confirmed and user.is_active) or user.is_superuser:
                login(request, user)
                user_data = UserSerializer(user).data
                return Response(user_data, status=200)
            else:
                raise AuthenticationFailed('Account is not confirmed')
        else:
            raise AuthenticationFailed('Invalid login data')


class LogoutView(APIView):
    def post(self, request):
        logout(request)

        return Response(status=200)


class SignupView(APIView):
    def post(self, request):
        fields = request.data

        email = fields['email']
        username = fields['username']

        try:
            validate_email(email)
        except ValidationError:
            raise AuthenticationFailed('Invalid email')

        try:
            validate_unicode_slug(username)
        except ValidationError:
            raise AuthenticationFailed('Invalid username')

        if len(username) < 2 or len(username) > 30:
            raise AuthenticationFailed('Invalid username')

        # Handle unique usernames
        if User.objects.filter(username__iexact=username):
            raise AuthenticationFailed('Username must be unique')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={ 'username': username, 'email': email, 'is_active': False }
        )

        if created:
            user.set_password(fields['password'])
            user.save()

            current_site = get_current_site(request)
            send_confirmation_email(user, current_site)

            return Response(status=200)
        else:
            raise AuthenticationFailed('User with this email already exists')
