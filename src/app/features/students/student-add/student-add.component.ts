import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/model/student.interface';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent {
  formStudent: FormGroup;
  sutdent: Student[] = [];
  preview: string | ArrayBuffer | null =
    'https://png.pngtree.com/png-clipart/20210709/ourmid/pngtree-cartoon-blue-purple-instagram-social-cute-female-student-avatar-png-image_3579094.jpg';
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formStudent = this.fb.group({
      // image: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // dob: ['', Validators.required],
      // gender: ['', Validators.required],
      // department: ['', Validators.required],
      image: [''],
      firstName: [''],
      lastName: [],
      email: [],
      dob: [],
      gender: [],
      department: [],
      contact: this.fb.array([]),
    });
  }

  triggleUpload() {
    document.getElementById('fileInput')?.click();
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formStudent.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => (this.preview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  get contact() {
    return this.formStudent.get('contact') as FormArray;
  }

  // addNewContact() {
  //   this.contact.push(this.newContact());
  // }

  addNewContact() {
    this.contact.push(
      (this.formStudent = this.fb.group({
        username: [''],
        relative: [''],
        telephone: [''],
        address: [''],
      }))
    );
  }
  // newContact(): FormGroup {
  //   return this.fb.group({
  //     username: ['', Validators.required],
  //     relative: ['', Validators.required],
  //     telephone: ['', Validators.required],
  //     address: ['', Validators.required],
  //   });
  // }

  onSubmit() {
    if (this.formStudent.invalid) {
      // return alert('Data validation is invalid...');
      this.formStudent.markAllAsTouched();
    } else {
      console.log(this.createStudent());
      // console.log('data', this.formStudent.value);
    }
  }

  createStudent() {
    this.studentService
      .addStudent(this.formStudent.value)
      .subscribe((value) => {
        console.log(value, 'data');
        this.router.navigate(['/student/allStudent']);
      });
  }
}
