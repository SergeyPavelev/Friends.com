# Generated by Django 5.0.1 on 2024-10-10 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0007_rename_reciever_visibility_message_receiver_visibility'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='time_created',
            field=models.TimeField(default=None, verbose_name='Время отправки'),
        ),
        migrations.AlterField(
            model_name='message',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Дата отправки'),
        ),
    ]
