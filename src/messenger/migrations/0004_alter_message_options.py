# Generated by Django 5.1.6 on 2025-03-02 09:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0003_alter_message_room'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-date_created'], 'verbose_name': 'Message', 'verbose_name_plural': 'Messages'},
        ),
    ]
