# Generated by Django 2.1.5 on 2019-02-01 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_auto_20190129_1644'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'verbose_name': 'Comment', 'verbose_name_plural': 'Comments'},
        ),
        migrations.AddField(
            model_name='comment',
            name='text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]