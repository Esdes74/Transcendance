# Generated by Django 4.2.17 on 2025-01-09 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('calcul', '0006_alter_tournament_curr_round'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player1', to='calcul.player')),
                ('player2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player2', to='calcul.player')),
            ],
        ),
        migrations.AddField(
            model_name='tournament',
            name='pairs',
            field=models.ManyToManyField(related_name='pairs', to='calcul.pair'),
        ),
    ]
