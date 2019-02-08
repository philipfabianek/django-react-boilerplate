from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer


def default_context_processor(request):
    context = {
        'bundle_css_path': 'bundle.css',
        'bundle_js_path': 'bundle.js',
    }

    return context


class InitialState(APIView):
    def get(self, request):
        if request.user.is_anonymous:
            return Response({}, status=200)

        user_data = UserSerializer(request.user).data
        return Response(user_data, status=200)


def index(request):
    return render(request, 'index.html')
