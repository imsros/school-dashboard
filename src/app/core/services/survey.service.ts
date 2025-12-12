import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurveyForm } from '../model/survey.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiSurvey = 'http://localhost:3000/surveys'
  constructor(private http: HttpClient) { }

  createSurvey(survey: SurveyForm): Observable<SurveyForm[]> {
    return this.http.post<SurveyForm[]>(this.apiSurvey, survey);
  }
}
