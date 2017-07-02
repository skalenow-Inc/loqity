from django.conf.urls import url
from loqity.core import views
urlpatterns = [
    url(r'^login$', views.login),
    url(r'^register$', views.register),
    url(r'^profile$',views.profile),
    url(r'^logout$',views.logout),
    url(r'^places$', views.place),
    url(r'^beacon$',views.beacon),
    url(r'beacon/(?P<beacon>\b[0-9A-Za-z]{10,40}\b)$',views.beacon_update),
]
