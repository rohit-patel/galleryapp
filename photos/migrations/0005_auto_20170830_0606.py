# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-30 06:06
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('photos', '0004_auto_20170829_0902'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Creation date')),
                ('updated_at', models.DateTimeField(auto_now=True, null=True, verbose_name='Modification date')),
                ('published', models.BooleanField(default=True, help_text='Decides whether entity should be treated as active.', verbose_name='Published')),
                ('ordering', models.IntegerField(blank=True, default=0, null=True, verbose_name='Ordering')),
                ('name', models.CharField(default='', max_length=250, verbose_name='Name')),
                ('title', models.CharField(blank=True, default='', max_length=250, verbose_name='Title')),
                ('description', models.CharField(blank=True, default='', max_length=250, verbose_name='Meta description')),
                ('keywords', models.CharField(blank=True, default='', max_length=250, verbose_name='Meta keywords')),
                ('slug', models.CharField(blank=True, db_index=True, default='', max_length=250, verbose_name='Slug')),
                ('users', models.ManyToManyField(related_name='albums', to=settings.AUTH_USER_MODEL, verbose_name='Users')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='photo',
            name='users',
            field=models.ManyToManyField(related_name='photos', to=settings.AUTH_USER_MODEL, verbose_name='Users'),
        ),
        migrations.AddField(
            model_name='photo',
            name='albums',
            field=models.ManyToManyField(related_name='albums_photos', to='photos.Album', verbose_name='Albums'),
        ),
    ]
