# Generated by Django 3.1.1 on 2020-10-08 07:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0009_auto_20201008_1459'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2020, 10, 8, 15, 2, 31, 719190)),
        ),
        migrations.AlterField(
            model_name='person',
            name='dateregistered',
            field=models.DateField(default=datetime.datetime(2020, 10, 8, 15, 2, 31, 718158)),
        ),
        migrations.AlterField(
            model_name='product',
            name='datereg',
            field=models.DateField(default=datetime.datetime(2020, 10, 8, 15, 2, 31, 718158)),
        ),
    ]
