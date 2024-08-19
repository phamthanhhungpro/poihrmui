import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from 'app/services/user.service';
import { ChamCongDiemDanhService } from 'app/services/chamcongdiemdanh.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diem-danh-thu-cong',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSelectModule],
  templateUrl: './diem-danh-thu-cong.component.html',
})
export class DiemDanhThuCongComponent {
  currentUser: any = {};
  userInfo = {
    role: localStorage.getItem('role'),
    tenantId: localStorage.getItem('tenantId'),
    userId: localStorage.getItem('userId')
  };

  currentDate = new Date();
  listTruongPhong = [];
  nguoiXacNhanId;

  constructor(private _userService: UserApiService,
    private _chamCongDiemDanhService: ChamCongDiemDanhService,
    private _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUserPhongBanInfo();
  }

  getCurrentUser() {
    this._userService.get(this.userInfo.userId).subscribe(res => {
      this.currentUser = res;
    })
  }

  checkInThuCong() {
    let data = {
      userId: this.userInfo.userId,
      nguoiXacNhanId: this.nguoiXacNhanId
    };

    this._chamCongDiemDanhService.checkInThuCong(data).subscribe(res => {
      if (res.IsSucceeded) {
        this.openSnackBar('Chấm công thành công', 'Đóng');
      } else {
        this.openSnackBar(res.message, 'Đóng');
      }
    }, err => {
      alert('Chấm công thất bại');
    })
  }

  getUserPhongBanInfo() {
    this._userService.getUserPhongBanInfo({ userId: this.userInfo.userId }).subscribe(res => {
      this.listTruongPhong = res.phongBanBoPhan.quanLy;
    });
  };

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 2000,
    });
  }
}
