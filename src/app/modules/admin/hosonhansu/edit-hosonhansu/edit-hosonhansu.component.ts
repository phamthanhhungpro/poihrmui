import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-hosonhansu',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, FuseDrawerComponent,
    MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatDividerModule,
    RouterLink, CommonModule, MatCheckboxModule],
  templateUrl: './edit-hosonhansu.component.html',
})
export class EditHosonhansuComponent {
  employeeForm: UntypedFormGroup;
  @Input() drawer: MatDrawer;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      ngheNghiepKhiDuocTuyenDung: [''],
      ngayTuyenDung: [''],
      coQuanTuyenDung: [''],
      chucVuHienTai: [''],
      ngayBoNhiem: [''],
      congViecChinh: [''],
      ngachCongChuc: [''],
      ngayBoNhiemNgach: [''],
      maNgach: [''],
      bacLuong: [''],
      heSoLuong: [''],
      ngayHuong: [''],
      phuCapChucVu: [''],
      phuCapKhac: [''],
      trinhDoPhoThong: [''],
      trinhDoChuyenMon: [''],
      lyLuanChinhTri: [''],
      quanLyNhaNuoc: [''],
      ngoaiNgu: [''],
      tinHoc: [''],
      ngayVaoDang: [''],
      ngayChinhThuc: [''],
      ngayThamGiaToChucChinhTriXaHoi: [''],
      ngayNhapNgu: [''],
      ngayXuatNgu: [''],
      quanHamCaoNhat: [''],
      danhHieuCaoNhat: [''],
      soTruongCongTac: [''],
      khenThuong: [''],
      kyLuat: [''],
      tinhTrangSucKhoe: [''],
      chieuCao: [''],
      canNang: [''],
      nhomMau: [''],
      laThuongBinhHang: [''],
      laConGiaDinhChinhSach: [''],
      soChungMinhNhanDan: [''],
      ngayCap: [''],
      soSoBHXH: [''],
      dacDiemLichSuBanThan: [''],
      thamGiaToChucNuocNgoai: [''],
      thanNhanOngNuocNgoai: [''],
      daoTao: this.fb.array([this.createDaoTaoGroup()]), // Array for multiple entries
      quaTrinhCongTac: this.fb.array([this.createQuaTrinhCongTacGroup()]), // Array for multiple entries
      quanHeGiaDinh: this.fb.array([this.createQuanHeGiaDinhGroup()]), // Array for multiple entries
      dienBienLuong: this.fb.array([this.createDienBienLuongGroup()]) // Array for multiple entries
    });
  }
  ngOnInit(): void {}

  createDaoTaoGroup(): UntypedFormGroup {
    return this.fb.group({
      tenTruong: [''],
      chuyenNganh: [''],
      tuThangNam: [''],
      denThangNam: [''],
      hinhThucDaoTao: [''],
      vanBangChungChi: ['']
    });
  }

  createQuaTrinhCongTacGroup(): UntypedFormGroup {
    return this.fb.group({
      tuThangNam: [''],
      denThangNam: [''],
      chucDanhChucVu: ['']
    });
  }

  createQuanHeGiaDinhGroup(): UntypedFormGroup {
    return this.fb.group({
      moiQuanHe: [''],
      hoVaTen: [''],
      namSinh: [''],
      queQuan: [''],
      ngheNghiep: ['']
    });
  }

  createDienBienLuongGroup(): UntypedFormGroup {
    return this.fb.group({
      thangNam: [''],
      maNgachBac: [''],
      heSoLuong: [''],
      laHeSoHienTai: ['']
    });
  }

  get daoTao(): FormArray {
    return this.employeeForm.get('daoTao') as FormArray;
  }

  get quaTrinhCongTac(): FormArray {
    return this.employeeForm.get('quaTrinhCongTac') as FormArray;
  }

  get quanHeGiaDinh(): FormArray {
    return this.employeeForm.get('quanHeGiaDinh') as FormArray;
  }

  get dienBienLuong(): FormArray {
    return this.employeeForm.get('dienBienLuong') as FormArray;
  }

  addDaoTao(): void {
    this.daoTao.push(this.createDaoTaoGroup());
  }

  addQuaTrinhCongTac(): void {
    this.quaTrinhCongTac.push(this.createQuaTrinhCongTacGroup());
  }

  addQuanHeGiaDinh(): void {
    this.quanHeGiaDinh.push(this.createQuanHeGiaDinhGroup());
  }

  addDienBienLuong(): void {
    this.dienBienLuong.push(this.createDienBienLuongGroup());
  }
  cancelEdit(): void {
    this.drawer.close();
  }

  save() {
    console.log(this.employeeForm.value);
  }
}
