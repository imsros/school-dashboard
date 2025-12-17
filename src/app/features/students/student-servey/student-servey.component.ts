import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/core/services/survey.service';
import { StudentAddSurveyComponent } from '../student-add-survey/student-add-survey.component';
import { NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private surveyService: SurveyService,
    private _snackBar: MatSnackBar
  ) {
    // Assign the data to the datasource for the table to render
    this.dataSource = new MatTableDataSource<SurveyForm>;
  }

  ngOnInit(): void {
    this.fetchSurvey();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fetchSurvey();
      }
    });

  }
  showSnack(message: string, type: 'success' | 'error' = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snack-success'] : ['snack-error']
    });
  }
  public fetchSurvey() {
    this.surveyService.getAllSurvey().subscribe((response) => {
      console.log(this.dataSource.data = response);
    })
  }

  public fetchUserById(id: string) {
    this.router.navigateByUrl(`/student/studentSurveyList/edit/${id}`).then(() => { });
  }
  public viewSurvey(id: string) {
    this.router.navigateByUrl(`/student/studentSurveyList/view/${id}`).then(() => { });
  }

  deleteSurvey(id: string) {
    this.surveyService.deleteSurvey(id).subscribe({
      next: () => {
        const deleteSurvey = this.dataSource.data.filter(s => s.id !== id);
        this.dataSource.data = deleteSurvey;
        this.showSnack('Survey deleted.');
      },
      error: () => {
        console.log('Failed to delete survey.');
      }
    })
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




