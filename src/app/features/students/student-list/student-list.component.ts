import { AfterViewInit, Component } from '@angular/core';
import { UserData } from 'src/app/core/model/userData.interface';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from 'src/app/core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/model/student.interface';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements AfterViewInit, OnInit {
  students: Student[] = [];
  public search : string = '';
  displayedColumns: string[] = [
    'id',
    'image',
    'firstName',
    'lastName',
    'email',
    'gender',
    'dob',
    'department',
    'actions',
  ];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngOnInit(): void {
    this.fetchStudent();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchStudent(): void {
    this.studentService.getAllStudent().subscribe((res) => {
      this.students = res;
      this.dataSource.data = res;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  //table angular material with default search feature
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  searchStudent(){
    const value = this.search.toLowerCase().trim();
    this.dataSource = new MatTableDataSource(
      this.students.filter(
      (student) => student.firstName.toLowerCase().includes(value) ||
                student.lastName.toLowerCase().includes(value) ||
                student.email.toLowerCase().includes(value) ||
                student.gender.toLowerCase().includes(value) ||
                student.department.toLowerCase().includes(value)
    ) 
    )  }

  deleteStudent(id: string) : void {
    this.studentService.deleteStudent(id).subscribe(
    {
      next : () => { const deleteStudent = this.dataSource.data.filter(s => s.id !== id);
        this.dataSource.data = deleteStudent;
       },
       error : () => alert('Failed to delete student.')
    })
  }
}
