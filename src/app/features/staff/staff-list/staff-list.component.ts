import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Staff } from 'src/app/core/model/staff.interface';
import { StaffService } from 'src/app/core/services/staff.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StaffListComponent implements OnInit {
  public staffs: Staff[] = [];
  public search: string = '';
  dataSource = new MatTableDataSource<Staff>();
  columnsToDisplay = ['staff_code', 'fullname', 'gender', 'dob', 'national_id', 'phone', 'email', 'position', 'date_hired'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Staff | null;

  constructor(private staffService: StaffService) { }
  ngOnInit(): void {
    this.fetchStaff();
  }
  fetchStaff() {
    this.staffService.getAllStaff().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  destroyStaff(id: string) {
    this.staffService.deleteStaff(id).subscribe(
      {
        next: () => {
          const deleteStaff = this.dataSource.data.filter(del => del.id !== id);
          this.dataSource.data = deleteStaff;
        },
        error: () => {
          console.log('Staff code could not found.')
        }
      }
    )
  }

  searchStaff() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

}


