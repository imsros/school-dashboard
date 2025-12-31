import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { SurveyService } from 'src/app/core/services/survey.service';
import { SurveyPreviewComponent } from '../survey-preview/survey-preview.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-add-survey',
  templateUrl: './student-add-survey.component.html',
  styleUrls: ['./student-add-survey.component.css']
})
export class StudentAddSurveyComponent implements OnInit {
  public formSurvey !: FormGroup;
  public viewMode = false;
  public survey: SurveyForm[] = [];
  public surveyID: string = '';
  public isSaving: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentAddSurveyComponent>,
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.router.url.includes('/view/')) {
      this.viewMode = true;
    }
    this.surveyID && this.getDataById(this.surveyID);
    this.addQuestion();
  }

  private showSnack(message: string, type: 'success' | 'error' = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snack-success'] : ['snack-error']
    });
  }
  private createForm() {
    this.formSurvey = this.fb.group({
      title: ['', Validators.required],
      created_date: [''],
      expire_date: ['', Validators.required],
      questions: this.fb.array([])
    })
  }
  getQuestion(questions: any[]) {
    if (!questions) return;

    this.questionArray.clear();
    questions.forEach(question => {
      const questionGroup = this.fb.group({
        questionText: [question.questionText, Validators.required],
        answerType: [question.answerType],
        showDirection: [question.showDirection],
        answers: this.fb.array([])
      });

      // patch answers
      if (question.answers) {
        question.answers.forEach((answer: { answerText: any; }) => {
          (questionGroup.get('answers') as FormArray).push(
            this.fb.group({
              answerText: [answer.answerText, Validators.required]
            })
          );
        });
      }

      this.questionArray.push(questionGroup);
    });
  }

  get questionArray(): FormArray {
    return this.formSurvey.get('questions') as FormArray;
  }
  private createQuestionArray(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      answerType: ['single'],
      showDirection: ['vertical'],
      answers: this.fb.array([])
    })
  }
  addQuestion() {
    const question = this.createQuestionArray();
    (question.get('answers') as FormArray).push(
      this.fb.group({
        answerText: ['', Validators.required]
      })
    );
    this.questionArray.push(question);
  }
  removeQuestion(index: number) {
    this.questionArray.removeAt(index);
  }
  private getDataById(id: string) {
    this.surveyService.getSurveyByID(id).subscribe((res) => {
      this.formSurvey.patchValue({
        title: res.title,
        created_date: res.created_date,
        expire_date: res.expire_date,
      });
      this.getQuestion(res.questions);

      if (this.viewMode) {
        this.formSurvey.disable();
      }
    })
  }

  getAnswer(index: number): FormArray {
    return this.questionArray.at(index).get('answers') as FormArray;
  }
  addAnswer(index: number) {
    this.getAnswer(index).push(this.fb.group({
      answerText: ['']
    }));
  }

  removeAnswer(parentIndex: number, answerIndex: number) {
    this.getAnswer(parentIndex).removeAt(answerIndex);
  }

  public createSurvey() {
    if (this.formSurvey.invalid) return;

    this.isSaving = true;

    this.surveyService.createSurvey({
      ...this.formSurvey.value,
      created_date: new Date().toISOString()
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.showSnack('Survey created.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSaving = false;
        this.showSnack('Failed to create survey.');
      }
    });
  }
  public onSubmit() {
    if (this.formSurvey.invalid) return;
    this.surveyID ? this.updateSurvey() : this.createSurvey();
  }

  public updateSurvey() {
    if (this.formSurvey.invalid) return;

    this.isSaving = true;
    this.surveyService.updateSurvey(this.surveyID, {
      ...this.formSurvey.value
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.showSnack('Save changed.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSaving = false;
        this.showSnack('Failed to save change.')
      }
    });
  }
  public openPreview() {
    this.dialog.open(SurveyPreviewComponent, {
      width: '600px',
      data: this.formSurvey.value
    });
  }
}
