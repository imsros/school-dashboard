import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  declarations: [
    StaffHomeComponent,
    StaffListComponent,
    StaffAttendanceComponent,
    StaffPayrollComponent,
  ],
  imports: [CommonModule, StaffRoutingModule, ShareModule],
})
export class StaffModule {}
