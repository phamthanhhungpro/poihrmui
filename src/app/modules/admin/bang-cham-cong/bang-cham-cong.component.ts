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
    this.date.setValue(this.selectedMonth);
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

  chosenYearHandler(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.date.value!;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.date.setValue(ctrlValue);
    datepicker._datepickerInput._openInMonthView = true; // This will open in the month view directly
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
