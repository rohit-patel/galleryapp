# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-31 18:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0006_album_count_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='count_images',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Count of images'),
        ),
    ]
