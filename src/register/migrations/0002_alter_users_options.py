# Generated by Django 5.0.1 on 2024-02-10 18:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='users',
            options={'ordering': ['pk'], 'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
    ]