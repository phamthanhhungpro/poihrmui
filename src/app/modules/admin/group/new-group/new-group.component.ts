import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-group',
  standalone: true,
  imports        : [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
                    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
  ],
  templateUrl: './new-group.component.html'
})
export class NewGroupComponent {
  @Input() drawer: MatDrawer;
  addGroupForm: UntypedFormGroup;
  @Output() onClosed = new EventEmitter<any>();

  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _groupService: GroupService,
    private _snackBar: MatSnackBar,
  ) {
    this.addGroupForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: ['']
    });    
  }

  ngOnInit(): void {
  }
  
  // clear form when close drawer
  clearForm(): void {
    this.addGroupForm.reset();
  }

  // close drawer and reset form
  cancelAdd(): void {
    this.drawer.close();
    this.clearForm();
  }
  
    // save data
    save(): void {
      this._groupService.create(this.addGroupForm.value).subscribe(res => {
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
