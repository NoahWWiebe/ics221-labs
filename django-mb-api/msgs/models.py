from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator

# Create your models here.
class Msg(models.Model):
    name = models.CharField(max_length=15, validators=[
        RegexValidator('^[A-Za-z0-9_]+$'),
        MinLengthValidator(3)
    ])
    msgText = models.CharField(max_length=30, validators=[
        MinLengthValidator(2)
    ])
    
    class Meta:
        ordering = ['-id']