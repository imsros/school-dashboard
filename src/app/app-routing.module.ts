import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ClassesComponent } from './features/classes/classes.component';
import { AttendaceComponent } from './features/attendace/attendace.component';
import { ExamComponent } from './features/exam/exam.component';
import { MyAccountComponent } from './features/my-account/my-account.component';
import { SettingComponent } from './features/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'student',
        loadChildren: () =>
          import('./features/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'lecturer',
        loadChildren: () =>
          import('./features/lecturer/lecturer.module').then(
            (m) => m.LecturerModule
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/staff/staff.module').then((m) => m.StaffModule),
      },
      // {
      //   path: 'classes',
      //   loadComponent: () =>
      //     import('./features/classes/classes.component').then(
      //       (m) => m.ClassesComponent
      //     ),
      // },
      {
        path: 'classes',
        component: ClassesComponent,
      },
      { path: 'attendance', component: AttendaceComponent },
      { path: 'exams', component: ExamComponent },
      { path: 'myAccount', component: MyAccountComponent },
      { path: 'setting', component: SettingComponent },
      // {
      //   path: 'attendance',
      //   loadComponent: () =>
      //     import('./features/attendace/attendace.component').then(
      //       (m) => m.AttendaceComponent
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
