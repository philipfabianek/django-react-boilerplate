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
    email = models.EmailField(primary_key=True)
    name = models.CharField(max_length=60)

    def __str__(self):
        return '{} ({})'.format(self.name, self.email)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'


class Post(models.Model):
    author = models.ForeignKey(Author, related_name='posts', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    headline = models.CharField(max_length=120)
    text = models.TextField()
    subject = models.ForeignKey(Subject, related_name='posts', on_delete=models.CASCADE)
    upvoters = models.ManyToManyField(Author, related_name='upvoted_posts', blank=True)
    downvoters = models.ManyToManyField(Author, related_name='downvoted_posts', blank=True)

    def __str__(self):
        return '{} - by {}'.format(self.headline, self.author.name)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'


class Comment(models.Model):
    author = models.ForeignKey(Author, related_name='comments', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return 'Comment on {} by {}'.format(self.post.headline, self.author.name)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
