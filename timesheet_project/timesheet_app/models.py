from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from datetime import date

class Timesheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    date = models.DateField(default=date.today)
    worked_hours = models.PositiveIntegerField()
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.project_name}"

class TimesheetEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.CharField(max_length=50)
    project_name = models.CharField(max_length=255)
    hour_9 = models.CharField(max_length=255, blank=True, null=True)
    hour_10 = models.CharField(max_length=255, blank=True, null=True)
    hour_11 = models.CharField(max_length=255, blank=True, null=True)
    hour_12 = models.CharField(max_length=255, blank=True, null=True)
    hour_1 = models.CharField(max_length=255, blank=True, null=True)
    hour_2 = models.CharField(max_length=255, blank=True, null=True)
    hour_3 = models.CharField(max_length=255, blank=True, null=True)
    hour_4 = models.CharField(max_length=255, blank=True, null=True)
    hour_5 = models.CharField(max_length=255, blank=True, null=True)
    hour_6 = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.day}"