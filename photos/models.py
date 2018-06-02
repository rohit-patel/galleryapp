from django.db import models
from core.models import OrderingBaseModel, BaseModel, ContentBaseModel
import uuid 
from django.conf import settings
from easy_thumbnails.files import get_thumbnailer
from django.contrib.auth.models import User

def make_upload_path(instance, filename, prefix = False):
    """
    Create unique name for image or file.
    """
    new_name = str(uuid.uuid1())
    parts = filename.split('.')
    f = parts[-1]
    filename = new_name + '.' + f
    return u"%s/%s" % (settings.IMAGE_DIR, filename)

class Size(models.Model):
    """Dimensions for preparing images"""
    TYPES = (
        ('crop', 'crop'),
        ('sharpen','sharpen'),
        ('upscale','upscale')
    )
    name = models.CharField("Name",
                            max_length=255,
                            default="",
                            )
    width = models.CharField("Width",
                            max_length=255,
                            default="",
                            )
    height = models.CharField("Height",
                            max_length=255,
                            default="",
                           )
    type = models.CharField("Height",
                            max_length=255,
                            default="crop",
                            choices = TYPES
                           )
    def __str__(self):
        return self.name

class Album(ContentBaseModel):
    """ Also has fields: name slug ... see in parent class """
    users = models.ManyToManyField(User,
                                    related_name='albums',
                                    verbose_name='Users')
    count_images = models.IntegerField("Count of images",
                                    default=0,
                                    blank=True,
                                    null=True)

    def get_photos(self):
        return Photo.objects.filter(albums=self)

    def __str__(self):
        return self.name



class Photo(OrderingBaseModel):
    """ Also has fields: ordering published created_at updated_at"""

    name = models.CharField("Name",
                            max_length=255,
                            default="",
                            blank=True)
    image = models.ImageField("Image",
                                upload_to=make_upload_path,
                                default="")
    users = models.ManyToManyField(User,
                                    related_name='photos',
                                    verbose_name='Users')
    albums = models.ManyToManyField(Album,
                                    related_name='albums_photos',
                                    verbose_name='Albums')

    def __str__(self):
        return self.name


    def save(self):
        """ Check thumbs for image """
        super(Photo, self).save()
        for s in Size.objects.all():
            t = Thumbs.objects.filter(photo=self, size=s).first()
            if not t:
                options = {'size': (int(s.width), int(s.height)), s.type: True}
                thumb_url = get_thumbnailer(self.image).get_thumbnail(options).url
                t = Thumbs(photo=self,
                            size=s,
                            name=s.name,
                            url=thumb_url)
                t.save()
        for a in self.albums.all():
            a.count_images = Photo.objects.filter(albums=a).count()
            a.save()

    def pic(self):
        if self.image:
            return u'<img src="%s" width="100"/>' % get_thumbnailer(self.image)['thumb-xs'].url
            
        else:
            return '(none)'
    pic.short_description = 'Image'
    pic.allow_tags = True

    class Meta:
        verbose_name='Image'
        verbose_name_plural='Images'
        ordering = ('created_at',)


class Thumbs(BaseModel):
    """Has links to different sizes of image"""
    photo = models.ForeignKey(Photo,
                                related_name='thumbs',
                                null=True,
                                on_delete=models.CASCADE)
    size = models.ForeignKey(Size,
                                related_name='sizes',
                                null=True,
                                on_delete=models.CASCADE)
    name = models.CharField("Name",
                            max_length=255,
                            default="",
                            blank=True)
    url = models.CharField("Url",
                            max_length=255,
                            default="",
                            blank=True)
    def __str__(self):
        return self.name
