import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BangChamCongComponent } from '../bang-cham-cong/bang-cham-cong.component';
import { XacNhanChamCongComponent } from '../chamcong-diemdanh/xac-nhan-cham-cong/xac-nhan-cham-cong.component';

@Component({
  selector: 'app-quan-ly-cham-cong',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, BangChamCongComponent, XacNhanChamCongComponent],
  templateUrl: './quan-ly-cham-cong.component.html',
})
export class QuanLyChamCongComponent {

}
