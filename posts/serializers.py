from rest_framework import serializers


class PostAuthorSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=60)


class PostSubjectSerializer(serializers.Serializer):
    name = serializers.CharField()


class PostCommentSerializer(serializers.Serializer):
    author = PostAuthorSerializer()
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
