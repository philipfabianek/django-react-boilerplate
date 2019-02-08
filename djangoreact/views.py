import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email, validate_unicode_slug
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed


def default_context_processor(request):
    context = {
        'bundle_css_path': 'bundle.css',
        'bundle_js_path': 'bundle.js',
    }

    return context


def index(request):
    return render(request, 'index.html')


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
            email__iexact=email,
            defaults={ 'username': username, 'email': email.lower() }
        )

        if created:
            user.set_password(fields['password'])
            user.save()
            login(request, user)
            return Response(status=200)
        else:
            raise AuthenticationFailed('User with this email already exists')
