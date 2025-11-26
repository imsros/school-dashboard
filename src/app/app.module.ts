import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importing
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './environment/MaterialModule';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AttendaceComponent } from './features/attendace/attendace.component';
import { ClassesComponent } from './features/classes/classes.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExamComponent } from './features/exam/exam.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MyAccountComponent } from './features/my-account/my-account.component';
import { SettingComponent } from './features/setting/setting.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from './shared/share.module';
import { StudentsModule } from './features/students/students.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AttendaceComponent,
    ClassesComponent,
    DashboardComponent,
    ExamComponent,
    NotFoundComponent,
    MyAccountComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule,
    ShareModule,
    StudentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
