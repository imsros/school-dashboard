import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LecturerRoutingModule } from './lecturer-routing.module';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { LecturerScheduleComponent } from './lecturer-schedule/lecturer-schedule.component';
import { ShareModule } from 'src/app/shared/share.module';
import { MaterialModule } from 'src/app/environment/MaterialModule';
import { LecturerAddComponent } from './lecturer-add/lecturer-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LecturerHomeComponent,
    LecturerListComponent,
    LecturerManagementComponent,
    LecturerScheduleComponent,
    LecturerAddComponent,
  ],
  imports: [CommonModule, LecturerRoutingModule, ShareModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class LecturerModule { }
