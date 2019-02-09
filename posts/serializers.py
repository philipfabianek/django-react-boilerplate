from rest_framework import serializers

from djangoreact.serializers import UserSerializer


class PostAuthorSerializer(serializers.Serializer):
    user = UserSerializer()


class PostSubjectSerializer(serializers.Serializer):
    name = serializers.CharField()


class PostCommentSerializer(serializers.Serializer):
    author = UserSerializer()
    created_on = serializers.DateTimeField()
    text = serializers.CharField()


class PostSerializer(serializers.Serializer):
    id = serializers.CharField()
    author = PostAuthorSerializer()
    created_on = serializers.DateTimeField()
    headline = serializers.CharField(max_length=120)
    text = serializers.CharField()
    subject = PostSubjectSerializer()
    comments = PostCommentSerializer(many=True)
