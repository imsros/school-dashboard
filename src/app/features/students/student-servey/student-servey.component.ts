import { AfterViewInit, Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { MatDialog } from '@angular/material/dialog';
import { SurveyService } from 'src/app/core/services/survey.service';
import { NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-servey',
  templateUrl: './student-servey.component.html',
  styleUrls: ['./student-servey.component.css']
})
export class StudentServeyComponent implements OnInit, AfterViewInit, OnDestroy {
  public displayedColumns: string[] = ['position', 'title', 'created_date', 'expire_date', 'questions', 'submitted_answer', 'actions'];
  public dataSource = new MatTableDataSource<SurveyForm>;
  private destroy = new Subject<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private surveyService: SurveyService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchSurvey();
    this.router.events.pipe(filter((event => event instanceof NavigationEnd))).subscribe(() => this.fetchSurvey());
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private showSnack(message: string, type: 'success' | 'error' = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snack-success'] : ['snack-error']
    });
  }
  private fetchSurvey() {
    // this.surveyService.getAllSurvey().subscribe((response) => {
    //   this.dataSource.data = response;
    // })
    this.surveyService.getAllSurvey().pipe(takeUntil(this.destroy)).subscribe(response => this.dataSource.data = response);
  }

  public fetchUserById(id: string) {
    this.router.navigateByUrl(`/student/studentSurveyList/edit/${id}`);
  }
  public viewSurvey(id: string) {
    this.router.navigateByUrl(`/student/studentSurveyList/view/${id}`);
  }

  public deleteSurvey(id: string) {
    this.surveyService.deleteSurvey(id).pipe(takeUntil(this.destroy))
      .subscribe({
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
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}