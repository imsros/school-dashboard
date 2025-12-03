import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DaysOption, Lecturer } from 'src/app/core/model/lecturere.interface';
import { LecturerService } from 'src/app/core/services/lecturer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lecturer-add',
  templateUrl: './lecturer-add.component.html',
  styleUrls: ['./lecturer-add.component.css']
})
export class LecturerAddComponent implements OnInit {
  public preview: string | ArrayBuffer | null = 'https://i.pinimg.com/1200x/84/21/3c/84213c274232612ea26c8809893b3c7f.jpg';

  formLecturer!: FormGroup;

  lecturer: Lecturer[] = []; //array instance of interface

  constructor(public dialog: MatDialog, private fb: FormBuilder, private lecturerService: LecturerService, private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<LecturerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) { }

  daysOptions: DaysOption[] = [
    { day: 'Monday', value: 'monday' },
    { day: 'Tuesday', value: 'tuesday' },
    { day: 'Wednesday', value: 'wednesday' },
    { day: 'Thursday', value: 'thursday' },
    { day: 'Friday', value: 'friday' },
    { day: 'Saturday', value: 'saturday' }
  ];

  ngOnInit(): void {
    this.formValidate();
    console.log(this.data);
  }


  formValidate() {
    this.formLecturer = this.fb.group({
      id: [''],
      username: [''],
      email: [''],
      phone: [null],
      profession: this.fb.array([]),
      available_hour: this.fb.array([]),
      image: ['']
    })
  }
  //a getter to make it easiser to read and use everywhere without reapeating the same code 
  get professionArray(): FormArray {
    return this.formLecturer.get('profession') as FormArray;  //as FormArray tells TypeScript to treat it as FormArray
  }

  //push a new empty profession field into the FormArray
  addProfession() {
    this.professionArray.push(this.fb.control(''));
    //pushing form control because profession is just a simple string
  }
  //simple removing​ form array by index
  removeProfession(index: number) {
    this.professionArray.removeAt(index);
  }

  //get the form array of available_hour
  get availableArray(): FormArray {
    return this.formLecturer.get('available_hour') as FormArray;
  }
  //create the structure for one day inside the available_hour array
  createAvailableHourGroup(): FormGroup {
    return this.fb.group({
      day: [''],
      hours: this.fb.array([])
    })
  }
  //add a new day group (day + hours[]) into the FormArray.
  addAvailableHour(): void {
    this.availableArray.push(this.createAvailableHourGroup());
  }
  //remove a day group
  removeAvailableHour(index: number) {
    this.availableArray.removeAt(index);
  }

  //get the inner hours FormArray for a specific day
  getHourArray(index: number): FormArray {
    return this.availableArray.at(index).get('hours') as FormArray;
    //availableArray.at(index) : the selected day group
    //.get('hours') : access the hours FormArray inside the group
  }

  addHour(index: number): void {
    this.getHourArray(index).push(this.fb.control(''));
  }

  removeHour(parentIndex: number, hourIndex: number): void {
    this.getHourArray(parentIndex).removeAt(hourIndex);
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
      this.preview = reader.result;  //for using in template by property binding.

      this.formLecturer.patchValue({ image: reader.result });

    };
    reader.readAsDataURL(file);
  }


  //create a lecturer
  createLecturer() {
    this.lecturerService.createLecturer(this.formLecturer.value).subscribe((value) => {
      console.log(value, 'data');
    })
  }

  onSubmit() {
    if (this.formLecturer.invalid) return alert('form validation failed');
    else {
      this.createLecturer();
      // alert('Lecturer created successfully');
    }
  }

  /* done testing form input */



  /*start input to backend by using service */
}
