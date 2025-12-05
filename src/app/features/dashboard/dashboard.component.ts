import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  cards = [
    {
      title: 'Student Management',
      image:
        'https://cdn.dribbble.com/userupload/42267456/file/original-467a72c7bd21a6e908c7ed8a3d28423b.jpg?format=webp&resize=400x300&vertical=center',
      description:
        'Managing a student involves using a central system to track their personal and academic data, such as grades, attendance, and finances.',
      route: '/student',
    },
    {
      title: 'Lecturer Management',
      image:
        'https://i.pinimg.com/736x/ce/6c/31/ce6c31db6fb0b58e58a9ac9dcbf4fcc3.jpg',
      description:
        'A lecturer in management is an academic professional responsible for teaching, research, and administration within a university',
      route: '/lecturer',
    },
    {
      title: 'Staff Management',
      image:
        'https://www.shutterstock.com/image-vector/avatars-vector-collection-people-faces-260nw-2341355923.jpg',
      description:
        'Staff management is the process of guiding and supervising employees to ensure they perform their jobs effectively and contribute',
      route: '/staff',
    },
  ];
}
