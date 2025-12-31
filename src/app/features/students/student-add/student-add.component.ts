import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departments } from 'src/app/core/model/student.interface';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  formStudent!: FormGroup;
  public studentID: string = '';
  public genders = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' }
  ]

  departmentOptions: Departments[] = [
    { department: 'Biology', value: 'Biology' },
    { department: 'Chemistry', value: 'Chemistry' },
    { department: 'Computer Science', value: 'Computer Science' },
    { department: 'Environmental Science', value: 'Environmental Science' },
    { department: 'Mathematics', value: 'Mathematics' },
    { department: 'Physics', value: 'Physics' }
  ]
  // public showFormArray = false;
  preview: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formValidate();
    const id = this.route.snapshot.paramMap.get('id');
    this.studentID = id ? id.toString() : '';
    if (id) {
      this.getStudentById();
      this.getStudentContact();
    }
  }
  //dynamic validator
  private formValidate() {
    this.formStudent = this.fb.group({
      image: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      contact: this.fb.array([]),
    });
  }
  private newContact(): FormGroup {
    return this.fb.group({
      username: [''],
      relative: [''],
      telephone: [''],
      address: ['',],
    });
  }
  get contact() {
    return this.formStudent.get('contact') as FormArray;
  } //we can call contact by this helper method

  addNewContact() {
    this.contact.push(this.newContact());
  } //next, the method  add a contact. It uses the newContact method which returns the Contact FormGroup and add contact array.

  public triggleUpload() {      //when click on image, we can browse to our local machine
    document.getElementById('fileInput')?.click();
  }
  public onImageChange(event: any) {     //tracking on image change
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result;
      this.formStudent.patchValue({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  private createStudent() {
    this.studentService.addStudent(this.formStudent.value).subscribe(() => {
      this.router.navigate(['/student/allStudent']);
    });
  }
  private getStudentById() {
    this.studentService.getStudentById(this.studentID).subscribe((student) => {
      this.formStudent.patchValue({
        image: student.image,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        gender: student.gender,
        dob: student.dob,
        department: student.department
      });
      this.preview = student.image;
    })
  }
  private editStudent(id: string) {
    this.studentService.updateStudent(id, this.formStudent.value).subscribe((response) => {
      if (!response) return;
      this.router.navigate(['/student/allStudent']);
    })
  }

  private getStudentContact() {
    this.studentService.getStudentById(this.studentID).subscribe((student) => {
      if (!student.contact) return;
      this.contact.clear();
      student.contact.forEach((studentContact: any) => {
        this.contact.push(
          this.fb.group({
            username: [studentContact.username],
            relative: [studentContact.relative],
            telephone: [studentContact.telephone],
            address: [studentContact.address]
          })
        )
      })
    })
  }

  public onSubmit() {
    if (this.formStudent.invalid) return;
    this.studentID ? this.editStudent(this.studentID) : this.createStudent();
  }

}
