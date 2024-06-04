import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
  calendarDays: any[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    // Generate the calendar days with sample data
    const daysInMonth = 30; // Adjust as needed
    const events = [
      { date: 1, name: 'Ngày nghỉ', class: 'bg-orange-200' },
      { date: 2, name: 'Quên chấm công vào', class: 'bg-green-200' },
      // Add more events as needed
    ];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(event => event.date === i);
      this.calendarDays.push({
        date: i,
        classes: 'p-2 border',
        events: dayEvents
      });
    }
  }
}
