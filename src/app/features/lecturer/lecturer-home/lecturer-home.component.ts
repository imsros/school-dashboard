import { Component } from '@angular/core';

@Component({
  selector: 'app-lecturer-home',
  templateUrl: './lecturer-home.component.html',
  styleUrls: ['./lecturer-home.component.css'],
})
export class LecturerHomeComponent {
  lecturer_home = [
    {
      title: 'Lecturer',
      image:
        'https://i.pinimg.com/1200x/ea/48/6c/ea486ccfc5b634b42ace9a6612125be1.jpg',
      description: 'View all lecturer',
      route: '/lecturer/allLecturer',
    },
    {
      title: 'Management',
      image:
        'https://i.pinimg.com/736x/65/5b/81/655b81dc33c00f9fd29ce510700bdebf.jpg',
      description: 'View lecturer management',
      route: '/lecturer/lecturerManagement',
    },
    {
      title: 'Schedule',
      image:
        'https://i.pinimg.com/736x/57/5e/9e/575e9efbd7f207bdd9433cc0e886ae4e.jpg',
      description: 'View schedule',
      route: '/lecturer/lecturerSchedule',
    },
  ];
}
