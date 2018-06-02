from rest_framework import generics
from photos.models import Album, Photo
from .serializers import AlbumListSerializer, AlbumSerializer


class AlbumListView(generics.ListAPIView):
	queryset = Album.objects.all().prefetch_related()
	serializer_class = AlbumListSerializer
	model = Album


class AlbumView(generics.RetrieveAPIView):
	queryset = Album.objects.all().prefetch_related()
	serializer_class = AlbumSerializer
	model = Album
	lookup_field = 'slug'
