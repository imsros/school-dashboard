import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { LecturerScheduleComponent } from './lecturer-schedule/lecturer-schedule.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LecturerAddComponent } from './lecturer-add/lecturer-add.component';

const routes: Routes = [
  { path: '', component: LecturerHomeComponent },
  { path: 'allLecturer', component: LecturerListComponent },
  { path: 'lecturerManagement', component: LecturerManagementComponent },
  { path: 'lecturerSchedule', component: LecturerScheduleComponent },
  { path: 'edit/:id', component : LecturerListComponent}, //using the same component due to using dialog for open new add form 
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerRoutingModule {}
