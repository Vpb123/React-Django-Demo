from django.db import models
from django.contrib.auth.models import User

class Marks(models.Model):
    physics =models.PositiveIntegerField(null=True)
    chemistry = models.PositiveIntegerField(null=True)
    maths =models.PositiveIntegerField(null=True)

    def __str__(self):
        return (f'Phy:{self.physics} Chem:{self.chemistry} Maths:{self.maths}')

# Create your models here.
class Student(models.Model):
    # stid=models.IntegerField(primary_key=True,default)
    # owner = models.ForeignKey(User, related_name="students",on_delete=models.CASCADE, null=True)
    name=models.CharField(max_length=100)
    Class=models.CharField(max_length=10)
    Roll_no=models.IntegerField()
    City=models.CharField(max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)
    marks = models.ForeignKey("Marks", on_delete=models.CASCADE,null=True,related_name='mark')
    
    def __str__(self):
        return self.name


    
