# Generated by Django 4.2.16 on 2024-10-29 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djap_register', '0003_alter_userprofile_options_alter_userprofile_managers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_id',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
