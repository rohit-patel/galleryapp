from django.core.management.base import BaseCommand, CommandError
from photos.models import Photo, Thumbs, Size
from easy_thumbnails.files import get_thumbnailer




class Command(BaseCommand):

    def handle(self, *args, **options):
    	for p in Photo.objects.all():
    		for s in Size.objects.all():
	            t = Thumbs.objects.filter(photo=p, size=s).first()
	            if not t:
	                options = {'size': (int(s.width), int(s.height)), s.type: True}
	                thumb_url = get_thumbnailer(p.image).get_thumbnail(options).url
	                t = Thumbs(photo=p,
	                            size=s,
	                            name=s.name,
	                            url=thumb_url)
	                t.save()
	                print(t.id)
