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
  deleteStaff(id: string): Observable<Staff> {
    return this.http.delete<Staff>(`${this.apiStaff}/${id}`);
  }

  getStaffById(id: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiStaff}/${id}`);
  }
  updateStaff(id: string, partial: Partial<Staff>): Observable<Staff> {
    return this.http.patch<Staff>(`${this.apiStaff}/${id}`, partial);
  }
}