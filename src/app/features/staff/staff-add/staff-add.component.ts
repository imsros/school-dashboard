import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StaffService } from 'src/app/core/services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  chooseGender!: string;
  genders: string[] = ['Male', 'Female', 'Prefer not to say'];

  formStaff !: FormGroup;
  //to avoid ts warning, we need the exclamation mark
  preview: string | ArrayBuffer | null =
    'https://png.pngtree.com/png-clipart/20210709/ourmid/pngtree-cartoon-blue-purple-instagram-social-cute-female-student-avatar-png-image_3579094.jpg';

  //angular material chips
  separatorKeysCodes: number[] = [ENTER, COMMA];
  depCtrl = new FormControl('');
  filteredDep: Observable<string[]>;
  departments: string[] = [''];
  allDeps: string[] = ['Biology', 'Computer Science', 'Chemistry', 'Environmental Science', 'Mathematic', 'Physics'];
  @ViewChild('depInput')
  depInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private staffService: StaffService, private fb: FormBuilder, private route: Router, private router: ActivatedRoute) {
    this.filteredDep = this.depCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allDeps.slice())),
    );
  }

  ngOnInit(): void {
    this.formStaff = this.fb.group({
      image: [''],
      staff_code: [''],
      fullname: [''],
      gender: [''],
      dob: [''],
      national_id: [''],
      phone: [''],
      email: [''],
      position: [''],
      department: [''],
      date_hired: [''],
    })
  }

  triggleUpload() {
    document.getElementById('fileInput')?.click();
  }

  onImageChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;   //if no file selected, function stop.
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
      this.formStaff.patchValue({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }
  createStaff() {
    this.staffService.createStaff(this.formStaff.value).subscribe((value) => {
      console.log(value, 'data');

    })
  }

  submitStaff() {
    if (this.formStaff.valid) {
      this.createStaff();
      this.route.navigate(['/staff/allStaff']);
    }
  }

  //from angular material chips
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.departments = [value];          // Only one
      this.formStaff.get('department')?.setValue(value);
    }

    event.chipInput!.clear();
    this.depCtrl.setValue(null);
  }

  remove(department: string): void {
    this.departments = [];
    this.formStaff.get('department')?.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.departments = [event.option.viewValue];
    this.formStaff.get('department')?.setValue(event.option.viewValue);

    this.depInput.nativeElement.value = '';
    this.depCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allDeps.filter(dep =>
      dep.toLowerCase().includes(filterValue)
    );
  }
  //ended a chip for department field
}
