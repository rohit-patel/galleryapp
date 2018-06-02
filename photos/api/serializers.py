from rest_framework import serializers
from photos.models import Album, Photo,Thumbs


class AlbumListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Album
		fields = '__all__'


class ThumbsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Thumbs
		fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
	#thumbs = ThumbsSerializer(many=True,read_only=True)
	thumbs = serializers.SerializerMethodField()
	class Meta:
		model = Photo
		fields = '__all__'

	def get_thumbs(self, obj):
		res = {}
		for t in Thumbs.objects.filter(photo=obj):
			res.update({t.name:ThumbsSerializer(instance=t).data})
		return res




class AlbumSerializer(serializers.ModelSerializer):
	albums_photos = PhotoSerializer(many=True,read_only=True)
	class Meta:
		model = Album
		fields = '__all__'