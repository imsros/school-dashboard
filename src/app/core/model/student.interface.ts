export interface Student {
  id: string;
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
