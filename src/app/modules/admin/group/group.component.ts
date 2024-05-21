import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { Observable, map } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewGroupComponent } from './new-group/new-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-group',
  standalone: true,
  templateUrl: './group.component.html',
  styles: [
    /* language=SCSS */
    `
        .group-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 112px 200px auto 96px;
            }
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewGroupComponent,
    EditGroupComponent],
})
export class GroupComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;

  public groups$;

  drawerComponent: 'new-group' | 'edit-group';
  configForm: UntypedFormGroup;
  selectedData: any;
  pageSize = 10; // Initial page size
  pageNumber = 0; // Initial page index
  totalItems = 0; // Total items
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
              private _groupService: GroupService
  )
  {
  }

  ngOnInit(): void
  {
      // Build the config form
      this.configForm = this._formBuilder.group({
          title      : 'Xóa nhóm',
          message    : 'Xóa nhóm này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
          icon       : this._formBuilder.group({
              show : true,
              name : 'heroicons_outline:exclamation-triangle',
              color: 'warn',
          }),
          actions    : this._formBuilder.group({
              confirm: this._formBuilder.group({
                  show : true,
                  label: 'Remove',
                  color: 'warn',
              }),
              cancel : this._formBuilder.group({
                  show : true,
                  label: 'Cancel',
              }),
          }),
          dismissible: true,
      });

      this.getGroups();
  }

  addGroup() {
    this.drawerComponent = 'new-group';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editGroup(group: any) {
    this.selectedData = group;
    this.drawerComponent = 'edit-group';
    this.addDrawer.open();
  }

  deleteGroup(group: any) {
      // Open the dialog and save the reference of it
      const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) =>
      {
          if(result === 'confirmed') {
            this._groupService.delete(group.id).subscribe(() => {
              this.getGroups();
            });
          }
      });
  }

  // get data from api
  getGroups() {
    const query = {
      pageNumber: this.pageNumber + 1,
      pageSize: this.pageSize
    };
    this.groups$ = this._groupService.getAll(query).pipe(
      map((data: any) => {
          const groups: any[] = data.items.map((group, index: number) => ({
              ...group,
              stt: index + 1
          }));
          this.totalItems = data.count;
          return { groups };
      })
    );
  }

  onPageChange(event): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getGroups();
  }








  drawerOpenedChanged(isOpened) {
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }
}
