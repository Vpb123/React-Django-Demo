from django.contrib import admin
from .models import Student,Marks
# Register your models here.
class StudentAdmin(admin.ModelAdmin):  # add this
      list_display = ('name', 'Roll_no', 'Class') # add this

    # Register your models here.
admin.site.register(Student, StudentAdmin)

class MarksAdmin(admin.ModelAdmin):  # add this
      list_display = ('physics', 'chemistry', 'maths') # add this

    # Register your models here.
admin.site.register(Marks)