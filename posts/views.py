from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer, PostCommentSerializer


class GetPost(APIView):
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post_data = PostSerializer(post).data

        is_favorite = False
        if not request.user.is_anonymous and request.user in post.upvoters.all():
            is_favorite = True

        return Response({
            'post': post_data,
            'is_favorite': is_favorite,
        }, status=200)


class FetchPosts(APIView):
    def get(self, request):
        posts = Post.objects.all().order_by('-created_on')[:20];
        posts_data = PostSerializer(posts, many=True).data

        return Response({ 'posts': posts_data }, status=200)


class ChangeFavorite(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        if request.user in post.upvoters.all():
            post.upvoters.remove(request.user)
        else:
            post.upvoters.add(request.user)

        return Response(status=200)


class CommentOnPost(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        author = request.user
        text = request.data['text']

        comment = post.add_comment(author, text)
        comment_data = PostCommentSerializer(comment).data

        return Response({ 'comment': comment_data }, status=200)
