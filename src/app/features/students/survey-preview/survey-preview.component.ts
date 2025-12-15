import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SurveyForm } from 'src/app/core/model/survey.interface';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.css']
})
export class SurveyPreviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SurveyForm) { }

}
