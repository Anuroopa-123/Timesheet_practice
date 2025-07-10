# timesheet_app/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Timesheet
from .serializers import TimesheetSerializer
from openpyxl import Workbook
from django.http import HttpResponse

class TimesheetList(APIView):
    def get(self, request):
        timesheets = Timesheet.objects.all()
        serializer = TimesheetSerializer(timesheets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TimesheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TimesheetDetail(APIView):
    def put(self, request, pk):
        timesheet = Timesheet.objects.get(pk=pk)
        serializer = TimesheetSerializer(timesheet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ExportTimesheets(APIView):
    def get(self, request):
        # Create a workbook and add a sheet
        wb = Workbook()
        ws = wb.active
        ws.title = "Timesheets"

        # Define header row
        headers = ["Project Name", "Date", "Worked Hours", "Remarks"]
        ws.append(headers)

        # Add data rows
        timesheets = Timesheet.objects.all()
        for timesheet in timesheets:
            ws.append([
                timesheet.project_name,
                timesheet.date,
                timesheet.worked_hours,
                timesheet.remarks
            ])

        # Prepare response
        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename=timesheets.xlsx'
        wb.save(response)
        return response
