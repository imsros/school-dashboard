export interface Student {
  id: string;
  position: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  department: string;
  contact: [
    {
      username: string;
      telephone: number;
      relative: string;
      address: string;
    }
  ];
}

export interface Departments {
  department: string;
  value: string;
}
