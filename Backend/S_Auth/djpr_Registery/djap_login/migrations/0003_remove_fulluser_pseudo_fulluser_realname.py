# Generated by Django 4.2.17 on 2024-12-26 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djap_login', '0002_fulluser_language_fulluser_secu'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fulluser',
            name='pseudo',
        ),
        migrations.AddField(
            model_name='fulluser',
            name='realname',
            field=models.CharField(default=None, max_length=25, null=True),
        ),
    ]