# Generated by Django 4.2.17 on 2024-12-18 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='pongDB',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scorePlayer1', models.IntegerField(default=0)),
                ('scorePlayer2', models.IntegerField(default=0)),
            ],
        ),
    ]