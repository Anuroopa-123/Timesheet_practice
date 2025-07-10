import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Timesheet {
  id: number;
  project_name: string;
  date: string;
  worked_hours: number;
  remarks: string;
}
@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css',
})
export class TimesheetComponent implements OnInit {
  // timesheets: Timesheet[] = [];

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchTimesheets();
  // }

  // fetchTimesheets() {
  //   this.http
  //     .get<Timesheet[]>('http://127.0.0.1:8000/api/timesheets/')
  //     .subscribe((data) => {
  //       this.timesheets = data;
  //     });
  // }

  timesheets: Timesheet[] = [];
  newTimesheet: Timesheet = {
    id: 0,
    project_name: '',
    date: '',
    worked_hours: 0,
    remarks: '',
  };
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTimesheets();
  }

  fetchTimesheets() {
    this.loading = true;
    this.error = null;

    this.http
      .get<Timesheet[]>('http://127.0.0.1:8000/api/timesheets/')
      .subscribe(
        (data) => {
          this.timesheets = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load timesheets';
          this.loading = false;
        }
      );
  }

  onSubmit() {
    if (this.newTimesheet.id) {
      // Update existing timesheet
      this.http
        .put<Timesheet>(
          `http://127.0.0.1:8000/api/timesheets/${this.newTimesheet.id}/`,
          this.newTimesheet
        )
        .subscribe(() => {
          this.fetchTimesheets(); // Refresh the list
          this.newTimesheet = {
            id: 0,
            project_name: '',
            date: '',
            worked_hours: 0,
            remarks: '',
          }; // Reset form
        });
    } else {
      // Create new timesheet
      this.http
        .post<Timesheet>(
          'http://127.0.0.1:8000/api/timesheets/',
          this.newTimesheet
        )
        .subscribe(() => {
          this.fetchTimesheets(); // Refresh the list
          this.newTimesheet = {
            id: 0,
            project_name: '',
            date: '',
            worked_hours: 0,
            remarks: '',
          }; // Reset form
        });
    }
  }

  editTimesheet(index: number) {
    const timesheetToEdit = this.timesheets[index];
    this.newTimesheet = { ...timesheetToEdit }; // Pre-fill the form with the selected timesheet data
  }
}
