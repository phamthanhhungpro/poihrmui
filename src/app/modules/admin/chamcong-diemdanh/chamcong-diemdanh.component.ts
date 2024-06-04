import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ThamSoLuongService } from 'app/services/thamsoluong.service';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import timeGridPlugin from '@fullcalendar/timegrid';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-chamcong-diemdanh',
  standalone: true,
  styles: [
  ],
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, CommonModule, FullCalendarModule],
  templateUrl: './chamcong-diemdanh.component.html'
})
export class ChamCongDiemDanhComponent {
  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;

  public data$;
  selectedData: any;

  drawerComponent: 'new-data' | 'edit-data';
  configForm: UntypedFormGroup;
  calendarOptions;
  @ViewChild('fullCalendar') calendarComponent: FullCalendarComponent;
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private _thamsoluongService: ThamSoLuongService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initCalendar();
  }

  ngAfterViewInit() {

  }

  addData() {
    this.drawerComponent = 'new-data';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editData(role: any) {
    this.selectedData = role;
    this.drawerComponent = 'edit-data';
    this.addDrawer.open();
  }

  // we need this function to distroy the child component when drawer is closed
  drawerOpenedChanged(isOpened) {
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }

  handleDateClick(arg) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg) {
    alert('Event clicked: ' + arg.event.start);
  }

  initCalendar() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventOrder: 'start',
      events: [
        {
          daysOfWeek: [0, 6], //Sundays and saturdays
          display: 'background'
        },
        {
          title: 'Quên chấm công',
          start: '2024-06-21',
          description: 'Chờ giải trình',
          color: '#ff0000'
        },
        {
          title: 'Hợp lệ',
          start: '2024-06-06',
          description: 'Đi làm',
          color: '#217a38'
        },
        {
          title: 'Hợp lệ',
          start: '2024-06-07',
          description: 'Đi làm',
          color: '#217a38'
        },
        {
          title: 'Hợp lệ',
          start: '2024-06-10',
          description: 'Đi làm',
          color: '#217a38'
        },
      ],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      height: 'auto',
      locales: allLocales,
      locale: 'vi',
      eventDidMount: function (info) {
        if (info.event.extendedProps.description) {
          var eventElement = info.el;
          let descriptionElement = document.createElement('div');
          
          descriptionElement.innerHTML = `<div class="">${info.event.extendedProps.description}</div>`;
          descriptionElement.style.color =  "#fff";
          eventElement.appendChild(descriptionElement);
        }
      }
    };

    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 250);
  }
}
