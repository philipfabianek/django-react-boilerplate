from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get-post/(?P<pk>[0-9]+)', views.GetPost.as_view()),
    url(r'^fetch-posts', views.FetchPosts.as_view()),
    url(r'^favorite-posts', views.FavoritePosts.as_view()),
    url(r'^change-favorite/(?P<pk>[0-9]+)', views.ChangeFavorite.as_view()),
    url(r'^comment/(?P<pk>[0-9]+)', views.CommentOnPost.as_view()),
]
