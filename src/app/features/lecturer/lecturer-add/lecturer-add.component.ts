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
  public preview: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
  formLecturer!: FormGroup;
  public lecturer: Lecturer[] = []; //array instance of interface
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
    if (this.data) {
      this.loadLecturerForEdit(this.data);
    }
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
  get professionArray(): FormArray {   //a getter to make it easiser to read and use everywhere without reapeating the same code 
    return this.formLecturer.get('profession') as FormArray;  //as FormArray tells TypeScript to treat it as FormArray
  }
  addProfession() {   //push a new empty profession field into the FormArray
    this.professionArray.push(this.fb.control('')); //pushing form control because profession is just a simple string
  }
  removeProfession(index: number) {   //simple removing​ form array by index
    this.professionArray.removeAt(index);
  }
  get availableArray(): FormArray {   //get the form array of available_hour
    return this.formLecturer.get('available_hour') as FormArray;
  }
  createAvailableHourGroup(): FormGroup {   //create the structure for one day inside the available_hour array
    return this.fb.group({
      day: [''],
      hours: this.fb.array([])
    })
  }
  addAvailableHour(): void {   //add a new day group (day + hours[]) into the FormArray.
    this.availableArray.push(this.createAvailableHourGroup());
  }
  removeAvailableHour(index: number) {  //remove a day group
    this.availableArray.removeAt(index);
  }
  getHourArray(index: number): FormArray {    //get the inner hours FormArray for a specific day
    return this.availableArray.at(index).get('hours') as FormArray;
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

  updateLecturer() {
    this.lecturerService.updateLecturer(this.data, this.formLecturer.value)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
  createLecturer() {
    this.lecturerService.createLecturer(this.formLecturer.value).subscribe((value) => {
      console.log(value, 'data');
    })
  }
  loadLecturerForEdit(id: string) {
    this.lecturerService.getLecturerById(id).subscribe((lecturer) => {
      this.formLecturer.patchValue({
        id: lecturer.id,
        username: lecturer.username,
        email: lecturer.email,
        phone: lecturer.phone,
        image: lecturer.image
      });

      // Profession (string[])
      this.professionArray.clear();
      lecturer.profession.forEach((p: string) => {
        this.professionArray.push(this.fb.control(p));
      });

      // Available hours
      this.availableArray.clear();
      lecturer.available_hour.forEach(dayGroup => {
        const dayFG = this.createAvailableHourGroup();
        dayFG.patchValue({ day: dayGroup.day });

        const hourArray = dayFG.get('hours') as FormArray;
        dayGroup.hours.forEach((h: string) => {
          hourArray.push(this.fb.control(h));
        });
        this.availableArray.push(dayFG);
      });
      // Preview image
      this.preview = lecturer.image;
    });
  }


  onSubmit() {
    if (this.formLecturer.invalid) return alert('Form validation failed');

    if (this.data) {
      this.updateLecturer();   // edit mode
    } else {
      this.createLecturer();   // create mode
    }
  }
}
