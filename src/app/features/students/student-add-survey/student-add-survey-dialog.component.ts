import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentAddSurveyComponent } from "./student-add-survey.component";

@Component({
    selector: 'app-student-add-survey-dialog',
    template: ''
})

export class StudentAddSurveyDialogComponent implements OnInit {
    constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            if (!params) return;
            else {
                this.openDialog();
            }
        })
    }
    private openDialog() {
        const dialogRef = this.dialog.open(StudentAddSurveyComponent, {
            panelClass: 'medium-dialog',   //apply custom css class to overlay-based component
            disableClose: true
        });
        //
        dialogRef.afterClosed().subscribe((data: boolean) => {
            if (data) {
                this.router.navigate(['/student/studentSurveyList'], {
                    relativeTo: this.activatedRoute,
                    state: { data }
                })
            } else {
                this.router.navigate(['/student/studentSurveyList'], {
                    relativeTo: this.activatedRoute
                })
            }
        })
    }
}