from django.contrib import admin

# Register your models here.
from .models import Msg
class MsgAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "msgText",
    )
        
admin.site.register(Msg, MsgAdmin)