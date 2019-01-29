# Generated by Django 2.1.5 on 2019-01-29 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20190128_2026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='downvoters',
            field=models.ManyToManyField(blank=True, related_name='downvoted_posts', to='posts.Author'),
        ),
        migrations.AlterField(
            model_name='post',
            name='upvoters',
            field=models.ManyToManyField(blank=True, related_name='upvoted_posts', to='posts.Author'),
        ),
    ]
