import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyForm } from 'src/app/core/model/survey.interface';
import { SurveyService } from 'src/app/core/services/survey.service';
import { SurveyPreviewComponent } from '../survey-preview/survey-preview.component';

@Component({
  selector: 'app-student-add-survey',
  templateUrl: './student-add-survey.component.html',
  styleUrls: ['./student-add-survey.component.css']
})
export class StudentAddSurveyComponent implements OnInit {
  public formSurvey !: FormGroup;
  public survey: SurveyForm[] = [];
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<StudentAddSurveyComponent>, private fb: FormBuilder, private surveyService: SurveyService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.addQuestion();
  }
  public createForm() {
    this.formSurvey = this.fb.group({
      title: [''],
      created_date: [''],
      expire_date: [''],
      questions: this.fb.array([])
    })
  }
  get questionArray(): FormArray {
    return this.formSurvey.get('questions') as FormArray;
  }
  createQuestionArray(): FormGroup {
    return this.fb.group({
      questionText: [''],
      answerType: ['single'],
      showDirection: ['vertical'],
      answers: this.fb.array([])
    })
  }
  addQuestion() {
    const question = this.createQuestionArray();
    (question.get('answers') as FormArray).push(
      this.fb.group({
        answerText: ['']
      })
    );
    this.questionArray.push(question);
  }
  removeQuestion(index: number) {
    this.questionArray.removeAt(index);
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

  // createSurvey() {
  //   this.surveyService.createSurvey(this.formSurvey.value).subscribe((value) => {
  //     console.log(value, 'data');
  //   })
  // }

  //extend created_date
  createSurvey() {
    this.surveyService.createSurvey({
      ...this.formSurvey.value,
      created_date: new Date().toISOString()
    }).subscribe(response => {
      console.log(response);
    })
  }

  openPreview() {
    this.dialog.open(SurveyPreviewComponent, {
      width: '600px',
      data: this.formSurvey.value
    });
  }
}
