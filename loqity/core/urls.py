from django.conf.urls import url
from loqity.core import views
urlpatterns = [
    url(r'^login/$', views.login),
    url(r'^register/$', views.register),
]
