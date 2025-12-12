import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-servey',
  templateUrl: './student-servey.component.html',
  styleUrls: ['./student-servey.component.css']
})
export class StudentServeyComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'created_date', 'expire_date', 'question', 'submitted_answer', 'actions'];
  dataSource: MatTableDataSource<SurveyForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<SurveyForm>;
  }

  ngOnInit(): void {
    this.route.children.forEach(child => {
      child.url.subscribe(url => {
        if (url.some(segment => segment.path === 'new')) {
          this.openDialogFromRoute();
        }
      })
    })
  }
  openDialogFromRoute() {

    // const dialogRef = this.dialog.open(SurveyDialogComponent, {
    //   width: '900px'

    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.router.navigate(['/student/studentSurveyList']); // back to list
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    // const dialogRef = this.dialog.open(SurveyDialogComponent);
    // this.router.navigateByUrl('/studentSurveyList/new');
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // this.router.navigate(['new'], { relativeTo: this.route });
    this.router.navigate(['/student', 'studentSurveyList', 'new']);
    alert('dialog open.')
  }
}




