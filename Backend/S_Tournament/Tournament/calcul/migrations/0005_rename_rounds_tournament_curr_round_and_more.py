# Generated by Django 4.2.16 on 2025-01-08 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calcul', '0004_remove_player_tournament_player_match_played_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tournament',
            old_name='rounds',
            new_name='curr_round',
        ),
        migrations.AddField(
            model_name='tournament',
            name='rounds_left',
            field=models.IntegerField(default=0),
        ),
    ]