import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lecturer } from '../model/lecturere.interface';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  private apiLecturer = 'http://localhost:3000/lecturers';
  constructor( private http: HttpClient) { }

  getAllLecturer(): Observable<Lecturer[]>{
    return this.http.get<Lecturer[]>(this.apiLecturer);
  }
  getLecturerById(id : string) : Observable<Lecturer>{
    return this.http.get<Lecturer>(`${this.apiLecturer}/${id}`);
  }

  createLecturer(lecturer : Lecturer): Observable<Lecturer>{
    return this.http.post<Lecturer>(`${this.apiLecturer}`, lecturer);
  }

  updateLecturer(id : string, partial : Partial<Lecturer>) : Observable<Lecturer>{
    return this.http.patch<Lecturer>(`${this.apiLecturer}/${id}`, partial);
  }
  deleteLecturer (id : string) : Observable<Lecturer>{
    return this.http.delete<Lecturer>(`${this.apiLecturer}/${id}`);
  }
}
