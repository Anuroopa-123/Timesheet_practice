import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimesheetComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'timesheet-frontend';
}
