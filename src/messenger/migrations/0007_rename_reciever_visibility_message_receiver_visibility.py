# Generated by Django 5.0.1 on 2024-06-22 20:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0006_rename_reciever_message_receiver'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='reciever_visibility',
            new_name='receiver_visibility',
        ),
    ]