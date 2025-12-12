import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentServeyComponent } from './student-servey/student-servey.component';
import { StudentAddSurveyDialogComponent } from './student-add-survey/student-add-survey-dialog.component';


const routes: Routes = [
  { path: '', component: StudentHomeComponent },
  { path: 'allStudent', component: StudentListComponent },
  { path: 'studentInformation', component: StudentInformationComponent },
  { path: 'studentSchedule', component: StudentScheduleComponent },
  {
    path: 'studentSurveyList', component: StudentServeyComponent,
    children: [
      {
        path: 'add', component: StudentAddSurveyDialogComponent
      }
    ]
  },
  { path: 'student-add', component: StudentAddComponent },
  { path: 'student-edit/:id', component: StudentAddComponent },
  // { path: 'studentSurveyList/new', component: StudentServeyComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule { }
