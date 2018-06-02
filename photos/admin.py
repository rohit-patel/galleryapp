from django.contrib import admin

from .models import Photo, Size, Album, Thumbs



@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('name','pic', 'published', 'created_at', 'updated_at')
    list_editable = ('published',)


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name','width', 'height', 'type',)
    list_editable = ('width', 'height', 'type',)

@admin.register(Thumbs)
class ThumbsAdmin(admin.ModelAdmin):
    pass



@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('name','published', 'ordering', 'count_images')
    list_editable = ('published','ordering')
    prepopulated_fields = {"slug": ("name",)}




