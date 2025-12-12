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
        'https://diplomasafe.com/wp-content/uploads/2025/03/sis-2-edited.png',
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
    {
      title: 'Survey',
      image: 'https://3.files.edl.io/c7b5/23/12/12/193240-7fc58398-0b62-4b15-996b-9f27570be47c.png',
      description: 'View Student Survey',
      route: '/student/studentSurveyList'
    }
  ];
}
