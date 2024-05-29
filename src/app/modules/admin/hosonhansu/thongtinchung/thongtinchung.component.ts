import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { AddManagerComponent } from '../../user/add-manager/add-manager.component';
import { EditUserComponent } from '../../user/edit-user/edit-user.component';
import { NewUserComponent } from '../../user/new-user/new-user.component';
import { CreateHosonhansuComponent } from '../create-hosonhansu/create-hosonhansu.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { Subject, map, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { HosonhansuService } from 'app/services/hosonhansu.service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserApiService } from 'app/services/user.service';
import { EditHosonhansuComponent } from '../edit-hosonhansu/edit-hosonhansu.component';

@Component({
  selector: 'app-thongtinchung',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, FuseDrawerComponent,
    MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule,
    RouterLink, CommonModule, EditHosonhansuComponent],
  templateUrl: './thongtinchung.component.html'
})
export class ThongtinchungComponent {
  @ViewChild('addDrawer', { static: false }) addDrawer: MatDrawer;
  id;
  accountForm: UntypedFormGroup;
  @Output() onClosed = new EventEmitter<any>();
  @Input() data: any = {};
  drawerComponent: 'new-data' | 'edit-data';
  hosoModel;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserApiService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _hosonhansuService: HosonhansuService
  ) {
    // Create the form
    this.accountForm = this._formBuilder.group({
      userName: [''],
      maHoSo: [''],
      fullName: [''],
      tenKhac: [''],
      vanphong: [''],
      phongban: [''],
      email: [''],
      phone: [''],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    console.log(this.data);
    this.getInfo();

  }

  save() {
    this._userService.update(this.data.id, this.accountForm.value).subscribe(
      (res) => {
        this.onClosed.emit();
        this.openSnackBar('Thao tác thành công', 'Đóng');
      },
      (error) => {
        // Handle error if observable emits an error
        console.error('Error:', error);
        // You can also display an error message to the user if needed
        this.openSnackBar('Có lỗi xảy ra khi thực hiện thao tác', 'Đóng');
      }
    );
  }

  // snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  // we need this function to distroy the child component when drawer is closed
  drawerOpenedChanged(isOpened) {
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }

  editData() {
    this.drawerComponent = 'edit-data';
    this.addDrawer.open();
  }

  getInfo() {
    this.id = this.route.snapshot.paramMap.get('id');
    this._hosonhansuService.get(this.id).subscribe(res =>
      {
        this.accountForm.get('userName').setValue(res.user.userName);
        this.accountForm.get('maHoSo').setValue(res.maHoSo);

        this.accountForm.get('fullName').setValue(res.user.fullName);
        this.accountForm.get('tenKhac').setValue(res.tenKhac);
        this.accountForm.get('vanphong').setValue(res.user.vanphong);
        this.accountForm.get('phongban').setValue(res.user.phongban);
        this.accountForm.get('email').setValue(res.user.email);
        this.accountForm.get('phone').setValue(res.user.phone);

        this.hosoModel = res;
      }
    )
    console.log('ID:', this.id);
  }
}
