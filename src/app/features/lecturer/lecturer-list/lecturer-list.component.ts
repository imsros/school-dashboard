import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LecturerAddComponent } from '../lecturer-add/lecturer-add.component';
import { Lecturer } from 'src/app/core/model/lecturere.interface';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LecturerService } from 'src/app/core/services/lecturer.service';



// const ELEMENT_DATA: Lecturer[] = [];
@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'profession', 'available_hour', 'image', 'actions'];
  ELEMENT_DATA: Lecturer[] = [];
  dataSource = this.ELEMENT_DATA;
  clickedRows = new Set<Lecturer>();

  constructor(public dialog: MatDialog, private lecturerService: LecturerService) { }

  ngOnInit(): void {
    this.fetchLecturer();
  }

  fetchLecturer() {
    this.lecturerService.getAllLecturer().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = response;
    })
  }
  openDialog(id?: string) {
    const dialogRef = this.dialog.open(LecturerAddComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchLecturer();
      console.log(`Dialog result : ${result}`);
    });
  }

  formatHour(available_hour: any[]): string {
    if (!available_hour) return '';

    return available_hour
      .map(a => a.hours)   // extract hours arrays
      .flat()              // flatten
      .join(', ');
  }


  deleteLecturerById(id: string) {
    this.lecturerService.deleteLecturer(id).subscribe({
      next: () => {
        const lecturerID = this.dataSource.filter(find => find.id !== id);
        this.dataSource = lecturerID;
      },
      error: () => { alert('Failed to delete lecturer.') }
    })
  }

  edit(id: string) {
    this.openDialog(id);
  }

}
