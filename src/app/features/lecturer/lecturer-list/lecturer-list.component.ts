import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LecturerAddComponent } from '../lecturer-add/lecturer-add.component';
import { Lecturer } from 'src/app/core/model/lecturere.interface';
import { LecturerService } from 'src/app/core/services/lecturer.service';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'id', 'username', 'email', 'phone', 'profession', 'image', 'actions'];
  dataSource: Lecturer[] = [];
  clickedRows = new Set<Lecturer>();

  constructor(public dialog: MatDialog, private lecturerService: LecturerService) { }

  ngOnInit(): void {
    this.fetchLecturer();
  }

  fetchLecturer() {
    this.lecturerService.getAllLecturer().subscribe((response) => {
      this.dataSource = response;
    })
  }
  openDialog(id?: string) {
    const dialogRef = this.dialog.open(LecturerAddComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchLecturer();
    });
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
