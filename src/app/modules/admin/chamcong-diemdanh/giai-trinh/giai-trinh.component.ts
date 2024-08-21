import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CongKhaiBaoService } from 'app/services/congkhaibao.service';
import { UserApiService } from 'app/services/user.service';
import { GiaiTrinhChamCongService } from 'app/services/giaitrinhchamcong.service';
import { SearchableSelectComponent } from 'app/common/components/select-search/searchable-select.component';
import { ChamCongDiemDanhService } from 'app/services/chamcongdiemdanh.service';

@Component({
  selector: 'app-giai-trinh',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, SearchableSelectComponent],
  templateUrl: './giai-trinh.component.html',
})
export class GiaiTrinhComponent {
  @Input() drawer: MatDrawer;
  @Input() data: any;
  @Input() type: any;

  @Output() onClosed = new EventEmitter<any>();

  addDataForm: UntypedFormGroup;
  tableData;
  congKhaiBaos;
  listTruongPhong = [];

  userInfo = {
    role: localStorage.getItem('role'),
    tenantId: localStorage.getItem('tenantId'),
    userId: localStorage.getItem('userId')
  };

  listCongKhaiBaoOptions = [];
  congXacNhanId;
  congKhaiBaoId;

  selectedData: any;
  trangThai;
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _congkhaibaoService: CongKhaiBaoService,
    private _userService: UserApiService,
    private _giaitrinhchamcongService: GiaiTrinhChamCongService,
    private _chamCongDiemDanhService: ChamCongDiemDanhService
  ) {
    this.addDataForm = this._formBuilder.group({
      ngayChamCong: [''],
      loaiLoi: [''],
      congKhaiBaoId: [''],
      lyDo: [''],
      nguoiXacNhan: [''],
      ghiChu: [''],
      fullName: [''],
      phongBan: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getCongKhaiBao();

    if (this.type === 'xac-nhan-giai-trinh') {
      this.getUserPhongBanInfo(this.data.hrmChamCongDiemDanh?.user.id);

      this.addDataForm.get('nguoiXacNhan').setValue(this.userInfo.userId);
      this.addDataForm.get('ngayChamCong').setValue(this.convertDate(this.data.hrmChamCongDiemDanh.thoiGian));
      this.addDataForm.get('loaiLoi').setValue(this.data.hrmChamCongDiemDanh.hrmTrangThaiChamCong.tenTrangThai);
      this.addDataForm.get('lyDo').setValue(this.data.lyDo);
      this.addDataForm.get('ghiChu').setValue(this.data.ghiChu);
      this.congKhaiBaoId = this.data.hrmCongKhaiBao.id;

      this.congXacNhanId = this.data.hrmCongKhaiBao.id;
      this.addDataForm.get('nguoiXacNhan').disable();
    };

    if (this.type !== 'xac-nhan-giai-trinh') {
      this.getUserPhongBanInfo(this.data.userId);
      this.getDetailChamCong();
      this.addDataForm.get('ngayChamCong').setValue(this.formatDate(this.data.start));
      this.addDataForm.get('loaiLoi').setValue(this.data.title);
    }
  }

  getDetailChamCong() {
    this._chamCongDiemDanhService.getDetail({ id: this.data.id }).subscribe(res => {
      this.selectedData = res;

      this.congKhaiBaoId = this.selectedData.hrmCongKhaiBao?.id;

      if (this.selectedData.hrmCongXacNhan) {
        this.congXacNhanId = this.selectedData.hrmCongXacNhan.id;
      }

      this.addDataForm.get('lyDo').setValue(this.selectedData.lyDo);
      this.addDataForm.get('ghiChu').setValue(this.selectedData.ghiChu);
      this.addDataForm.get('nguoiXacNhan').setValue(this.selectedData.nguoiXacNhanId);
      this.trangThai = this.selectedData.trangThai;
    });
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
      chamCongDiemDanhId: this.data.id,
      congKhaiBaoId: this.congKhaiBaoId,
      lyDo: this.addDataForm.get('lyDo').value,
      ghiChu: this.addDataForm.get('ghiChu').value,
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

  confirm(): void {
    var model = {
      giaiTrinhChamCongId: this.data.id,
      isXacNhan: true,
      congXacNhanId: this.congXacNhanId
    };

    this._giaitrinhchamcongService.confirm(model).subscribe(res => {
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
      this.listCongKhaiBaoOptions = res.map(item => { return { key: item.id, value: item.tenCongKhaiBao } });
    });
  }

  getUserPhongBanInfo(id) {
    this._userService.getUserPhongBanInfo({ userId: id }).subscribe(res => {
      this.listTruongPhong = res.phongBanBoPhan.quanLy;

      this.addDataForm.get('fullName').setValue(res.fullName);
      this.addDataForm.get('phongBan').setValue(res.phongBanBoPhan?.name);
    });
  };

  convertDate(isoDate) {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  setCongXacNhan(event) {
    this.congXacNhanId = event;
  }
  setCongKhaiBao(event) {
    this.congKhaiBaoId = event;
  }

  checkDisableForm() {
    if (this.type === 'xac-nhan-giai-trinh') {
      return true;
    } else {
      return this.trangThai === 3 || this.trangThai === 1;
    }
  }

  checkHideButton() {
    return this.trangThai === 3 || this.trangThai === 1;
  }

  showGuiXacNhanBtn() {
    console.log(this.type);
    return this.type !== 'xac-nhan-giai-trinh' && this.trangThai === 2;
  }

  showCongXacNhan() {
    return this.trangThai === 1 || this.type === 'xac-nhan-giai-trinh';
  }
}
