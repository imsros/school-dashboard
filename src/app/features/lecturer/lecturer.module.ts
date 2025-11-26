import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LecturerRoutingModule } from './lecturer-routing.module';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { LecturerScheduleComponent } from './lecturer-schedule/lecturer-schedule.component';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  declarations: [
    LecturerHomeComponent,
    LecturerListComponent,
    LecturerManagementComponent,
    LecturerScheduleComponent,
  ],
  imports: [CommonModule, LecturerRoutingModule, ShareModule],
})
export class LecturerModule {}
