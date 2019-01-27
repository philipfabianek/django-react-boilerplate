from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^fetch-posts', views.FetchPosts.as_view()),
]
