# Generated by Django 4.2.16 on 2024-10-29 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djap_register', '0004_alter_userprofile_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
