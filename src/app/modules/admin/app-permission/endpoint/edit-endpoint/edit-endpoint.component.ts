import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChucNangService } from 'app/services/chucnang.service';
import { EndpointService } from 'app/services/app-permission/endpoint.service';

@Component({
  selector: 'app-edit-endpoint',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule, MatSlideToggleModule
  ],  templateUrl: './edit-endpoint.component.html',
})
export class EditEndpointComponent {
  @Input() drawer: MatDrawer;
  @Output() onClosed = new EventEmitter<any>();
  @Input() data: any;
  addFunctionForm: UntypedFormGroup;

  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _endpointService: EndpointService,
    private _snackBar: MatSnackBar,
  ) {
    this.addFunctionForm = this._formBuilder.group({
      name: ['', Validators.required],
      method: ['', Validators.required],
      path: [''],
      isPublic: [false]
    });
  }

  ngOnInit(): void {
    this.addFunctionForm.patchValue(this.data);
  }

  // clear form when close drawer
  clearForm(): void {
    this.addFunctionForm.reset();
  }

  // close drawer and reset form
  cancelAdd(): void {
    this.drawer.close();
    this.clearForm();
  }

  // save data
  save(): void {
    this._endpointService.update(this.data.id, this.addFunctionForm.value).subscribe(res => {
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
}
