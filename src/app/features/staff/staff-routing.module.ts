import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  { path: '', component: StaffHomeComponent },
  { path: 'allStaff', component: StaffListComponent },
  { path: 'staffAttendance', component: StaffAttendanceComponent },
  { path: 'staffPayroll', component: StaffPayrollComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
