import z from "zod";

// types/form.types.ts
export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
  formData: StudentFormData;
  setFormData: (data: Partial<StudentFormData>) => void;
  isValid: boolean;
  validateStep: () => Promise<boolean>;
}

export interface StudentFormData {
  // Step 1: Basic Info
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  profileImageUrl: string;
  dateOfBirth: Date;
  studentId: string;
  isPermanentId: boolean;
  hobbies: string[];
  status: "Pending" | "Tested" | "Active" | "NOC" | "NOC-Cancel";
  isSatsangi: boolean;
  isBAPSSatsangi: boolean;
  yearsOfSatsang: number;
  
  // Step 2: Family Info
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
  }
  
  // Step 3: Health Info
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"| "-";
  illnesses: string[];
  allergies: string[];
  
  // Step 4: Academic Info
  admissionYear: string;
  schoolRollNo: number;
  standard: number;
  medium: "Gujarati" | "English" | "Hindi";
  lastExamGiven: string;
  lastExamPercentage: number;
  admissionDate: Date;

}

export interface StepConfig {
  id: string;
  title: string;
  component: React.ComponentType<StepProps>;
  validation: z.ZodSchema<any>;
  isOptional?: boolean;
}

// export interface studentFormData {
//   name: {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//   };
//   profileImageUrl: string;
//   dateOfBirth: Date;
//   studentId: string;
//   isPermanentId: boolean;
//   roomId: string;
//   bedNo: number;
//   departmentId: string;
//   admissionYear: string;
//   schoolRollNo: string;
//   standard: number;
//   medium: "Gujarati" | "English" | "Hindi";
//   lastExamGiven: string;
//   lastExamPercentage: number;
//   hobbies: string[];
//   bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
//   illnesses: string[];
//   allergies: string[];
//   fatherName: {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//   };
//   fatherMobileNumber: string;
//   fatherOccupation: string;
//   motherName: {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//   };
//   motherMobileNumber: string;
//   motherOccupation: string;
//   address: {
//     address: string;
//     city: string;
//     state: string;
//     pinCode: string;
//     country: string;
//   };
//   addmissionDate: Date;
//   leavingDate: Date;
//   nocDate?: Date;
//   status: "Pending" | "Tested" | "Active" | "NOC" | "NOC-Cancel";
//   isSatsangi: boolean;
//   isBAPSSatsangi: boolean;
//   yearsOfSatsang: number;
// }

// export interface StepProps {
//   formData: Partial<studentFormData>;
//   setFormData: (data: Partial<studentFormData>) => void;
//   onNext?: () => void;
//   onPrev?: () => void;
//   onComplete?: (data: studentFormData) => void;
//   onResetForm?: () => void;
// }

// export interface Step {
//   id: number;
//   title: string;
//   icon: React.ComponentType<{ size?: number }>;
// }
