import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentAPI = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentAPI);
  }
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.studentAPI}/${id}`);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.studentAPI}`, student);
  }
  updateStudent(id: string, partial: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.studentAPI}/${id}`, partial);
  }
  deleteStudent(id: string): Observable<Student> {
    return this.http.delete<Student>(`${this.studentAPI}/${id}`);
  }
}
