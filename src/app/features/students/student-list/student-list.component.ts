import { AfterViewInit, Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from 'src/app/core/services/students.service';
import { Student } from 'src/app/core/model/student.interface';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements AfterViewInit, OnInit {
  students: Student[] = [];
  public search: string = '';

  columnDefs = [
    { key: 'position', label: '#', type: 'index' },
    { key: 'id', label: 'Code' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender', pipe: 'gender' },
    { key: 'dob', label: 'Date of Birth', pipe: 'date' },
    { key: 'department', label: 'Department' },
    // { key: 'phone', label: 'Phone' }
  ];

  displayedColumns: string[] = [
    // 'position', 'id', 'image', 'firstName', 'lastName', 'email', 'gender', 'dob', 'department', 'actions',
    ...this.columnDefs.map(column => column.key), 'actions'
  ];
  dataSource = new MatTableDataSource<Student>();  //it helps us 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentsService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchStudent();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private fetchStudent(): void {
    this.studentService.getAllStudent().subscribe(response => this.dataSource.data = response);
  }
  public searchStudent() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  public deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(
      {
        next: () => {
          const deleteStudent = this.dataSource.data.filter(s => s.id !== id);
          this.dataSource.data = deleteStudent;
        },
        error: () => alert('Failed to delete student.')
      })
  }
  public openDialog(student: Student): void {   //confirm delete by using dialog
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: student.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.deleteStudent(student.id);
      }
    })
  }
} 
