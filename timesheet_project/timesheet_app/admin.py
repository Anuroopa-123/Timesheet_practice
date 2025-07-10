from django.contrib import admin
from .models import Timesheet

# Register your models here.
class TimesheetAdmin(admin.ModelAdmin):

    list_display = ('project_name', 'date', 'worked_hours', 'remarks')
    

    search_fields = ('project_name', 'date', 'remarks')

    list_filter = ('date', 'project_name')

 
    fields = ('project_name', 'date', 'worked_hours', 'remarks')


admin.site.register(Timesheet, TimesheetAdmin)