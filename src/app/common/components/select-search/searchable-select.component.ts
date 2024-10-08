import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Option {
  key: string;
  value: string;
}

@Component({
  standalone: true,
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
  ]
})
export class SearchableSelectComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() label: string = "Select an option";
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Select an option';
  @Input() noEntriesFoundLabel: string = 'Không tìm thấy kết quả';
  @Output() selectionChange = new EventEmitter<string>();
  @Input() selectedValue: any; // This will hold the value passed from the parent component
  @Input() customClass: string = '';
  selectFormControl = new FormControl();

  searchControl = new FormControl();
  filteredOptions: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.selectFormControl.setValue(this.selectedValue);
    
    if(this.disabled) {
      this.selectFormControl.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedValue) {
      this.selectFormControl.setValue(changes.selectedValue.currentValue);
    }
  }
  
  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.value);
  }
}
