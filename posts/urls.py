from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get-post/(?P<pk>[0-9]+)', views.GetPost.as_view()),
    url(r'^fetch-posts', views.FetchPosts.as_view()),
]
