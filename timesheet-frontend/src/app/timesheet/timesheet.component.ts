import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// interface Timesheet {
//   id: number;
//   project_name: string;
//   date: string;
//   worked_hours: number;
//   remarks: string;
// }
interface Timesheet {
  monday: { [hour: string]: string };
  tuesday: { [hour: string]: string };
  wednesday: { [hour: string]: string };
  thursday: { [hour: string]: string };
  friday: { [hour: string]: string };
  saturaday: { [hour: string]: string };
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
  // newTimesheet: Timesheet = {
  //   id: 0,
  //   project_name: '',
  //   date: '',
  //   worked_hours: 0,
  //   remarks: '',
  // };
  // loading = false;
  // error: string | null = null;

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchTimesheets();
  // }

  // fetchTimesheets() {
  //   this.loading = true;
  //   this.error = null;

  //   this.http
  //     .get<Timesheet[]>('http://127.0.0.1:8000/api/timesheets/')
  //     .subscribe(
  //       (data) => {
  //         this.timesheets = data;
  //         this.loading = false;
  //       },
  //       (error) => {
  //         this.error = 'Failed to load timesheets';
  //         this.loading = false;
  //       }
  //     );
  // }

  // onSubmit() {
  //   if (this.newTimesheet.id) {

  //     this.http
  //       .put<Timesheet>(
  //         `http://127.0.0.1:8000/api/timesheets/${this.newTimesheet.id}/`,
  //         this.newTimesheet
  //       )
  //       .subscribe(() => {
  //         this.fetchTimesheets();
  //         this.newTimesheet = {
  //           id: 0,
  //           project_name: '',
  //           date: '',
  //           worked_hours: 0,
  //           remarks: '',
  //         };
  //       });
  //   } else {

  //     this.http
  //       .post<Timesheet>(
  //         'http://127.0.0.1:8000/api/timesheets/',
  //         this.newTimesheet
  //       )
  //       .subscribe(() => {
  //         this.fetchTimesheets();
  //         this.newTimesheet = {
  //           id: 0,
  //           project_name: '',
  //           date: '',
  //           worked_hours: 0,
  //           remarks: '',
  //         };
  //       });
  //   }
  // }

  // editTimesheet(index: number) {
  //   const timesheetToEdit = this.timesheets[index];
  //   this.newTimesheet = { ...timesheetToEdit };
  // }

  timesheet: Timesheet = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturaday: {},
  };

  hours = [
    '9:30 AM',
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '1:30 PM',
    '2:30 PM',
    '3:30 PM',
    '4:30 PM',
    '5:30 PM',
  ];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitTimesheet() {
    const url = 'http://127.0.0.1:8000/api/timesheets/';
    this.http.post(url, this.timesheet).subscribe(
      (response) => {
        console.log('Timesheet submitted successfully!', response);
      },
      (error) => {
        console.error('Error submitting timesheet:', error);
      }
    );
  }
}
