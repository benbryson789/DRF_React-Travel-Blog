from django.contrib import admin
from . import models



@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author','image')
    prepopulated_fields = {'slug': ('title', ), }

    admin.site.register(models.Category)
@admin.register(models.Maps)
class MapsAdmin(admin.ModelAdmin):
    list_display = ('travel_advisory', 'id')