# Generated by Django 3.1.1 on 2020-10-10 14:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0016_auto_20201009_1529'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2020, 10, 10, 22, 22, 41, 850544)),
        ),
        migrations.AlterField(
            model_name='person',
            name='dateregistered',
            field=models.DateField(default=datetime.datetime(2020, 10, 10, 22, 22, 41, 850544)),
        ),
        migrations.AlterField(
            model_name='product',
            name='datereg',
            field=models.DateField(default=datetime.datetime(2020, 10, 10, 22, 22, 41, 848543)),
        ),
    ]
