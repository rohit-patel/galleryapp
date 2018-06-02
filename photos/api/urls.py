from django.conf.urls import url, include
from .views import AlbumListView, AlbumView

urlpatterns = [
	url(r'^albums/$', AlbumListView.as_view(), name="album_list" ),
	url(r'^albums/(?P<slug>[-a-z0-9_]+)/$', AlbumView.as_view(), name="album" ),
]