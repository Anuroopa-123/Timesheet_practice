

from django.urls import path
from .views import TimesheetList, TimesheetDetail, ExportTimesheets

urlpatterns = [
    path('api/timesheets/', TimesheetList.as_view(), name='timesheet-list'),
    path('api/timesheets/<int:pk>/', TimesheetDetail.as_view(), name='timesheet-detail'),
    path('api/timesheets/export/', ExportTimesheets.as_view(), name='timesheet-export'),
]
