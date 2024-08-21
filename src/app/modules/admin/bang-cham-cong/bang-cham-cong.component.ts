import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChamCongDiemDanhService } from 'app/services/chamcongdiemdanh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bang-cham-cong',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bang-cham-cong.component.html',
})
export class BangChamCongComponent implements OnInit {
  employees = [
    {
      name: 'IT00007 - Lê Minh Hiếu',
      days: ['X', 'X', 'X', /* Add the status for each day of the month */]
    },
    {
      name: 'IT02805 - Nguyễn Tuấn Dương',
      days: ['X', 'X', 'X', /* Add the status for each day of the month */]
    },
    // Add more employee records as needed
  ];

  daysInMonth: number[] = [];
  selectedMonth: Date = new Date(); // Default to the current month
  readonly date = new FormControl();

  /**
   *
   */
  constructor(private _chamCongDiemDanhService: ChamCongDiemDanhService, private router: Router) {

  }
  ngOnInit(): void {
    this.generateDaysInMonth(this.selectedMonth);
    this.getBangChamCong();
  }

  generateDaysInMonth(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Create an array [1, 2, ..., daysInMonth]
  }

  setMonthAndYear(date: Date, datepicker) {
    // gain 24h to the date to avoid timezone issue
    let newdate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    this.selectedMonth = newdate;
    this.date.setValue(date);
    this.generateDaysInMonth(this.selectedMonth);
    this.getBangChamCong();
    datepicker.close();
  }

  getBangChamCong() {
    let data = {
      userId: localStorage.getItem('userId'),
      time: this.selectedMonth
    }
    this._chamCongDiemDanhService.getBangChamCong(data).subscribe(res => {
      this.employees = res;
    });
  };

  detailChamCong(employee) {
    // navigate to cham-cong-diem-danh/:id
    this.router.navigate(['/cham-cong-diem-danh', employee.userId]);
  }
}
