# Generated by Django 4.2.16 on 2025-01-17 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calcul', '0017_alter_player_from_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tournament',
            name='username',
            field=models.CharField(default=None, max_length=150),
        ),
    ]
