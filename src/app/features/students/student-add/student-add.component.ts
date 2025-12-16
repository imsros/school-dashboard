import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departments, Student } from 'src/app/core/model/student.interface';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  formStudent!: FormGroup;
  // public edit = false;
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
  preview: string | ArrayBuffer | null =
    'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formValidate();
    const id = this.route.snapshot.paramMap.get('id'); //get the id that exit into the URL
    this.studentID = id ? id.toString() : '';   //if the id exist, convert to string, otherwise set to empty string
    // this.edit = id !== null;
    if (id) {
      this.getStudentById();
      this.getStudentContact();
    }
  }
  //dynamic validator
  formValidate() {
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

  createStudent() {
    this.studentService
      .addStudent(this.formStudent.value)
      .subscribe((value) => {
        console.log(value, 'data');
        this.router.navigate(['/student/allStudent']);
      });
  }
  getStudentById() {
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
      // console.log(this.formStudent.value, 'form')
      this.preview = student.image;
    })
  }
  editStudent(id: string) {
    this.studentService.updateStudent(id, this.formStudent.value).subscribe((response) => {
      if (!response) return;
      this.router.navigate(['/student/allStudent']);
    })
  }
  //get data in form array
  //fetch and update
  getStudentContact() {
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
  //helper method, which returns the contact FormArray from the model 
  get contact() {
    return this.formStudent.get('contact') as FormArray;
  }
  //add
  //the newContact method creates a new contact FormGroup and returns it. It has 4 properties.
  newContact(): FormGroup {
    return this.fb.group({
      username: [''],
      relative: [''],
      telephone: [''],
      address: ['',],
    });
  }
  //next, the method to add an contact. It uses the newContact method which returns the Contact FormGroup and add contact array.
  addNewContact() {
    this.contact.push(this.newContact());
  }

  triggleUpload() {      //when click on image, we can browse to our local image that exist
    document.getElementById('fileInput')?.click();
  }
  onImageChange(event: any) {     //tracking on image change, due to we also have default image setter
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;   //if no file selected, function stop.
    }
    const reader = new FileReader();      //FileReader is a js object that can read file (image,pdf, text) from the user's compoter.
    reader.onload = () => {    // When read completes, set preview and patch the form with the data URL string
      this.preview = reader.result;  //for using in template by property binding.
      this.formStudent.patchValue({ image: reader.result });   // store the base64/data URL string in the form so JSON backends (like json-server) can store it
    };
    reader.readAsDataURL(file);   //this tells FileReader to read the image and convert it to Base64 Data URL
  }
  onSubmit() {
    if (this.formStudent.invalid) return;
    this.studentID ? this.editStudent(this.studentID) : this.createStudent();
    // if (this.studentID) {
    //   this.editStudent(this.studentID);

    // } else {
    //   this.createStudent();
    // }

  }
}
