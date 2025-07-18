export interface Student {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  profileImageUrl: string;
  dateOfBirth: Date;
  studentId: string;
  isPermanentId: boolean;
  idConversionDate: Date;
  roomId: string;
  bedNo: number;
  departmentId: string;
  admissionYear: string;
  schoolRollNo: string;
  standard: number;
  medium: "Gujarati" | "English" | "Hindi";
  lastExamGiven: string;
  lastExamPercentage: number;
  hobbies: string[];
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  illnesses: string[];
  allergies: string[];
  fatherName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  fatherMobileNumber: string;
  fatherOccupation: string;
  motherName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  motherMobileNumber: string;
  motherOccupation: string;
  address: {
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  addmissionDate: Date;
  leavingDate: Date;
  nocDate?: Date;
  status: "Pending" | "Tested" | "Active" | "NOC" | "NOC-Cancel";
  isSatsangi: boolean;
  isBAPSSatsangi: boolean;
  yearsOfSatsang: number;
}