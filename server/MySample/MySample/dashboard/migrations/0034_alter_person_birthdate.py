# Generated by Django 4.0.5 on 2022-06-11 08:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0033_alter_person_birthdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2022, 6, 11, 16, 0, 44, 893148)),
        ),
    ]
