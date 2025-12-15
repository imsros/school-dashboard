import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/core/services/survey.service';


@Component({
  selector: 'app-student-servey',
  templateUrl: './student-servey.component.html',
  styleUrls: ['./student-servey.component.css']
})
export class StudentServeyComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'title', 'created_date', 'expire_date', 'questions', 'submitted_answer', 'actions'];
  public dataSource: MatTableDataSource<SurveyForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<SurveyForm>;
  }

  ngOnInit(): void {
    this.fetchSurvey();
  }
  public fetchSurvey() {
    this.surveyService.getAllSurvey().subscribe((response) => {
      console.log(this.dataSource.data = response);
    })
  }

  public fetchUserById(id: string) {
    this.router.navigateByUrl("/student/studentSurveyList/edit/:id" + id).then(() => { });
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


}




