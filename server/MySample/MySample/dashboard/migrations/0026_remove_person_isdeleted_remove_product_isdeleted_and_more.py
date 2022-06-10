# Generated by Django 4.0.5 on 2022-06-10 02:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0025_merge_20220610_0235'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='isDeleted',
        ),
        migrations.RemoveField(
            model_name='product',
            name='isDeleted',
        ),
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2022, 6, 10, 10, 51, 57, 21102)),
        ),
    ]
