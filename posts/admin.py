from django.contrib import admin

from .models import Subject, Author, Post, Comment

admin.site.register(Subject)
admin.site.register(Author)
admin.site.register(Post)
admin.site.register(Comment)
