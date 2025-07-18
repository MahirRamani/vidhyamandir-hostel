export interface studentFormData {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  profileImageUrl: string;
  dateOfBirth: Date;
  studentId: string;
  isPermanentId: boolean;
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

export interface StepProps {
  formData: Partial<studentFormData>;
  setFormData: (data: Partial<studentFormData>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: (data: studentFormData) => void;
  onResetForm?: () => void;
}

export interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}
