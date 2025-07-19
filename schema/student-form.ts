import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.object({
    firstName: z.string().min(2, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(2, "Last name is required"),
  }),
  profileImageUrl: z.string({ message: "Profile image URL is required" }),
  dateOfBirth: z.date({
    message: "Date of birth is required and must be a valid date",
  }),
  studentId: z
    .string({ message: "Student ID is required" })
    .min(3, "Student ID must be of 3 digits"),
  isPermanentId: z.boolean(),
  hobbies: z.array(z.string()).optional(), // 3 input
  skills: z.array(z.string()).optional(), // 3 input
  achievements: z.array(z.string()).optional(), // 3 input
  // skill // 3 input
  // achievements if any // 3 input
  status: z.enum(["Pending", "Tested", "Active", "NOC", "NOC-Cancel"], {
    message: "Status must be one of: Pending, Tested, Active, NOC, NOC-Cancel",
  }),
  isSatsangi: z.boolean(),
  isBAPSSatsangi: z.boolean().default(false),
  yearsOfSatsang: z.number().default(0), // dropdown
});

export const familyInfoSchema = z.object({
  fatherName: z.object({
    firstName: z.string().min(2, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(2, "Last name is required"),
  }),
  fatherMobileNumber: z
    .string({ message: "Mobile number is required" })
    .length(10, "Mobile number must be exactly 10 digits"),
  fatherOccupation: z.string({ message: "Occupation is required" }),
  motherName: z
    .object({
      firstName: z.string().min(2, "First name is required"),
      middleName: z.string().min(1, "Middle name is required"),
      lastName: z.string().min(2, "Last name is required"),
    })
    .optional(),
  motherMobileNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 10, {
      message: "Mobile number must be exactly 10 digits",
    }),
  motherOccupation: z.string().optional(),
  address: z.object({
    address: z.string().min(2, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pinCode: z.string().length(6, "Pin code must be of 6 digits"),
    country: z.string().min(2, "Country is required"),
  }),
  nativePlace: z.string().min(2, "Native place is required"),
  // native
});

export const healthInfoSchema = z.object({
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "-"], {
    message: "Blood group is required",
  }),
  illnesses: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
});

export const academicInfoSchema = z.object({
  admissionYear: z.string().min(4, "Admission year is required"),
  schoolRollNo: z
    .number({ message: "School roll number is required" })
    .min(1, "School roll number must be > 1"),
  standard: z
    .number({ message: "Standard is required" })
    .min(1, "Standard must be between 1 and 12")
    .max(12, "Standard must be between 1 and 12"),
  medium: z.enum(["Gujarati", "Hindi", "English"], {
    message: "Medium is required",
  }),
  // last school
  lastSchool: z.string().min(2, "Last school is required"),
  lastExamGiven: z.string().min(2, "Last exam given is required"),
  lastExamPercentage: z
    .number()
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100"),
  admissionDate: z.date({ message: "Admission date is required" }),
});


export const completeStudentFormSchema = z.intersection(
  z.intersection(basicInfoSchema, familyInfoSchema),
  z.intersection(healthInfoSchema, academicInfoSchema)
);