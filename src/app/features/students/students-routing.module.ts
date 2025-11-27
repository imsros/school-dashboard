import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StudentAddComponent } from './student-add/student-add.component';

const routes: Routes = [
  { path: '', component: StudentHomeComponent },
  { path: 'allStudent', component: StudentListComponent },
  { path: 'studentInformation', component: StudentInformationComponent },
  { path: 'studentSchedule', component: StudentScheduleComponent },
  { path: 'student-add', component: StudentAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
