# Generated by Django 4.0.5 on 2022-06-10 20:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0031_alter_person_birthdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='birthdate',
            field=models.DateField(default=datetime.datetime(2022, 6, 11, 4, 47, 11, 302861)),
        ),
    ]