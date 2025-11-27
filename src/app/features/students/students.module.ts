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
import { StudentContactComponent } from './student-contact/student-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentHomeComponent,
    StudentInformationComponent,
    StudentScheduleComponent,
    StudentAddComponent,
    StudentContactComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentListComponent,
    StudentHomeComponent,
    StudentInformationComponent,
    StudentScheduleComponent,
  ],
})
export class StudentsModule {}
