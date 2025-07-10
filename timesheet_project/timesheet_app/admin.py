from django.contrib import admin
from .models import Timesheet

# Register your models here.
class TimesheetAdmin(admin.ModelAdmin):
    # Fields to display in the admin list page
    list_display = ('project_name', 'date', 'worked_hours', 'remarks')
    
    # Adding search functionality in the admin
    search_fields = ('project_name', 'date', 'remarks')

    # Allowing filter options for admin
    list_filter = ('date', 'project_name')

    # Customizing form fields for creating or editing the Timesheet
    fields = ('project_name', 'date', 'worked_hours', 'remarks')

# Registering the Timesheet model with the customized admin interface
admin.site.register(Timesheet, TimesheetAdmin)