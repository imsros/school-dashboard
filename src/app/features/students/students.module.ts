import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { StudentScheduleComponent } from './student-schedule/student-schedule.component';
import { ShareModule } from 'src/app/shared/share.module';
import { MaterialModule } from 'src/app/environment/MaterialModule';
import { StudentAddComponent } from './student-add/student-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GenderPipe } from 'src/app/core/pipe/gender.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from './student-list/delete-dialog/delete-dialog.component';
import { StudentServeyComponent } from './student-servey/student-servey.component';
import { StudentAddSurveyComponent } from './student-add-survey/student-add-survey.component';



@NgModule({
  declarations: [
    StudentListComponent,
    StudentHomeComponent,
    StudentInformationComponent,
    StudentScheduleComponent,
    StudentAddComponent,
    GenderPipe,
    DeleteDialogComponent,
    StudentServeyComponent,
    StudentAddSurveyComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatTooltipModule
  ],
  exports: [
    StudentListComponent,
    StudentHomeComponent,
    StudentInformationComponent,
    StudentScheduleComponent,
  ],
})
export class StudentsModule { }
