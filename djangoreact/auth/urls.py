from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^signup', views.SignupView.as_view()),
]
