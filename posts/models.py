from django.contrib.auth.models import User
from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'


class Author(models.Model):
    user = models.OneToOneField(User, related_name='author_profile',
                                on_delete=models.CASCADE)

    def __str__(self):
        return 'Author {}'.format(self.user.name)

    class Meta:
        ordering = ('user__name',)
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'


class Post(models.Model):
    author = models.ForeignKey(Author, related_name='posts', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    headline = models.CharField(max_length=120)
    text = models.TextField()
    subject = models.ForeignKey(Subject, related_name='posts', on_delete=models.CASCADE)
    upvoters = models.ManyToManyField(User, related_name='upvoted_posts', blank=True)
    downvoters = models.ManyToManyField(User, related_name='downvoted_posts', blank=True)

    def __str__(self):
        return '{} - by {}'.format(self.headline, self.author.user.username)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'


class Comment(models.Model):
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return 'Comment on "{}" by {}'.format(self.post.headline, self.author.username)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
