import { Component } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  student_home = [
    {
      title: 'List',
      image:
        'https://i.pinimg.com/736x/1f/cf/3c/1fcf3c0190a76e6a0bcc3e46293786ad.jpg',
      description: 'View all students',
      route: '/student/allStudent',
    },
    {
      title: 'Information',
      image:
        'https://i.pinimg.com/736x/4c/ab/5a/4cab5a9e6991444475bd867828556178.jpg',
      description: 'View student information.',
      route: '/student/studentInformation',
    },
    {
      title: 'Schedule',
      image:
        'https://media.istockphoto.com/id/1072268542/vector/flat-weekly-schedule-and-calendar-planner-organization-management-online-app-on-laptop.jpg?s=612x612&w=0&k=20&c=QwU5lgCkyciRPpeRcO2vE_Cxvjy_pzo_QU5O8uc5zHY=',
      description: 'View Schedule',
      route: '/student/studentSchedule',
    },
  ];
}
