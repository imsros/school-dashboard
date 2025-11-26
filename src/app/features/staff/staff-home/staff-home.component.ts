import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css'],
})
export class StaffHomeComponent {
  staff_home = [
    {
      title: 'Staff',
      image:
        'https://i.pinimg.com/736x/e2/47/20/e24720bdc0bd38de36342e6b01c949bf.jpg',
      description: 'View all staff',
      route: '/staff/allStaff',
    },
    {
      title: 'Attendance',
      image:
        'https://i.pinimg.com/1200x/bb/45/bb/bb45bb3e628ae11f5024b525b846fc4f.jpg',
      description: 'View staff attendance',
      route: '/staff/staffAttendance',
    },
    {
      title: 'Payroll',
      image:
        'https://i.pinimg.com/736x/40/52/93/405293bf15006691980259feb740515b.jpg',
      description: 'View staff payroll',
      route: '/staff/staffPayroll',
    },
  ];
}
