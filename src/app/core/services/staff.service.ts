import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Staff } from '../model/staff.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiStaff = 'http://localhost:3000/staffs';
  constructor(private http: HttpClient) { }

  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.apiStaff}`, staff);
  }
  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiStaff);
  }
}