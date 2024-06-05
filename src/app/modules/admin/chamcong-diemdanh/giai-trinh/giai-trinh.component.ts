import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CongThucLuongService } from 'app/services/congthucluong.service';
import { ThamSoLuongService } from 'app/services/thamsoluong.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CongKhaiBaoService } from 'app/services/congkhaibao.service';
import { UserApiService } from 'app/services/user.service';
import { GiaiTrinhChamCongService } from 'app/services/giaitrinhchamcong.service';
import { an } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-giai-trinh',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule],
  templateUrl: './giai-trinh.component.html',
})
export class GiaiTrinhComponent {
  @Input() drawer: MatDrawer;
  @Input() data: any;

  @Output() onClosed = new EventEmitter<any>();

  addDataForm: UntypedFormGroup;
  tableData;
  congKhaiBaos;
  listTruongPhong;

  userInfo = {
    role: localStorage.getItem('role'),
    tenantId: localStorage.getItem('tenantId'),
    userId: localStorage.getItem('userId')
  }
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _congkhaibaoService: CongKhaiBaoService,
    private _userService: UserApiService,
    private _giaitrinhchamcongService: GiaiTrinhChamCongService
  ) {
    this.addDataForm = this._formBuilder.group({
      ngayChamCong: [''],
      loaiLoi: [''],
      congKhaiBaoId: [''],
      lyDo: [''],
      nguoiXacNhan: [''],
    });
  }

  ngOnInit(): void {
    this.getCongKhaiBao();
    this.getUserPhongBanInfo();

    if (this.data) {
      console.log(this.data.id);
      this.addDataForm.get('ngayChamCong').setValue(this.formatDate(this.data.start));
      this.addDataForm.get('loaiLoi').setValue(this.data.title);
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  // clear form when close drawer
  clearForm(): void {
    this.addDataForm.reset();
  }

  // close drawer and reset form
  cancelAdd(): void {
    this.drawer.close();
    this.clearForm();
  }

  // save data
  save(): void {
    var model = {
      chamCongDiemDanhId : this.data.id,
      congKhaiBaoId: this.addDataForm.get('congKhaiBaoId').value,
      lyDo: this.addDataForm.get('lyDo').value,
      nguoiXacNhan: this.addDataForm.get('nguoiXacNhan').value,
    };
    
    this._giaitrinhchamcongService.create(model).subscribe(res => {
      if (res.isSucceeded) {
        this.openSnackBar('Thao tác thành công', 'Đóng');
        this.onClosed.emit();
        this.drawer.close();
        this.clearForm();
      } else {
        this.openSnackBar('Thao tác thất bại', 'Đóng');
      }
    });
  }

  // snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  // get table data
  getCongKhaiBao() {
    this._congkhaibaoService.getAllNoPaging().subscribe(res => {
      this.congKhaiBaos = res;
    });
  }

  getUserPhongBanInfo() {
    this._userService.getUserPhongBanInfo({ userId: this.userInfo.userId }).subscribe(res => {
      this.listTruongPhong = res.phongBanBoPhan.managers;
    });
  }
}
