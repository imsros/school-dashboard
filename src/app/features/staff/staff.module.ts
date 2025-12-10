import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import { ShareModule } from 'src/app/shared/share.module';
import { HighlightDirective } from './directive/highlight.directive';
import { HoverChangeDirective } from './directive/hover-change.directive';
import { AttributeDirective } from './directive/attribute.directive';
import { DirectiveEventChangeComponent } from './directive-event-change/directive-event-change.component';
import { StaffAddComponent } from './staff-add/staff-add.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


//auto complete

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    StaffHomeComponent,
    StaffListComponent,
    StaffAttendanceComponent,
    StaffPayrollComponent,
    HighlightDirective,
    HoverChangeDirective,
    AttributeDirective,
    DirectiveEventChangeComponent,
    StaffAddComponent,


  ],
  imports: [CommonModule, StaffRoutingModule, ShareModule, MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule, MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule, MatAutocompleteModule, MatChipsModule, MatButtonModule
  ],
  exports: []
})
export class StaffModule { }
