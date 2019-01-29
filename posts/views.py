from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from .models import Post
from .serializers import PostSerializer


class GetPost(APIView):
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post_data = PostSerializer(post).data

        return Response({
            'post': post_data
        }, status=200)


class FetchPosts(APIView):
    def get(self, request):
        posts = Post.objects.all().order_by('-created_on')[:20];
        posts_data = PostSerializer(posts, many=True).data

        return Response({
            'posts': posts_data
        }, status=200)
