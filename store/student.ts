// import { create } from "zustand";
// import { Student } from "@/types/student";
// import { studentSchema } from "@/schema/student";
// import z, { date } from "zod";

// interface StudentStore {
//   students: (Student & { id: number })[];

//   formData: Student;

//   errors: Record<string, string>;
//   setErrors: (errors: Record<string, string>) => void;

//   resetForm: () => void;

//   addStudent: (student: Student) => void;
//   validateAndSubmit: () => { success: boolean; data?: Student; error?: any };

//   updateFormData: (field: keyof Student, value: any) => void;
// }

// // Zustand store with proper typing
// export const useStudentStore = create<StudentStore>((set, get) => ({
//   students: [],
//   formData: {
//     name: {
//       firstName: "",
//       middleName: "",
//       lastName: "",
//     },
//     profileImageUrl: "",
//     dateOfBirth: new Date(),
//     studentId: "",
//     isPermanentId: false,
//     idConversionDate: new Date(),
//     },
  
//   errors: {},

//   updateFormData: (field: keyof Student, value: any) =>
//     set((state) => ({
//       formData: { ...state.formData, [field]: value },
//     })),

//   setErrors: (errors: Record<string, string>) => set({ errors }),

//   resetForm: () =>
//     set({
//       formData: {
//         name: {
//           firstName: "",
//           middleName: "",
//           lastName: "",
//         },
//         profileImageUrl: "",
//         dateOfBirth: new Date(),
//         studentId: "",
//         isPermanentId: false,
//         idConversionDate: new Date(),
//       },
//       errors: {},
//     }),

//   addStudent: (student: Student) =>
//     set((state) => ({
//       students: [...state.students, { ...student, id: Date.now() }],
//     })),

//   validateAndSubmit: () => {
//     const { formData } = get();

//     try {
//       // Transform form data to match schema
//       const transformedData = {
//         name: formData.name,
//         profileImageUrl: formData.profileImageUrl || null,
//         dateOfBirth: formData.dateOfBirth
//           ? new Date(formData.dateOfBirth)
//           : null,
//         studentId: formData.studentId,
//         isPermanentId: formData.isPermanentId,
//         idConversionDate: formData.idConversionDate
//           ? new Date(formData.idConversionDate)
//           : undefined,
//       };

//       // Validate with Zod - cast the result to Student type
//       const validatedData = studentSchema.parse(transformedData) as Student;

//       // Clear errors and add student
//       set({ errors: {} });
//       // get().addStudent(validatedData);
//       get().resetForm();

//       // return { success: true, data: validatedData };
//       return { success: true };
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const errorMap: Record<string, string> = {};
//         error.issues.forEach((issue) => {
//           if (issue.path[0]) {
//             errorMap[issue.path[0] as string] = issue.message;
//           }
//         });
//         set({ errors: errorMap });
//       }
//       return { success: false, error };
//     }
//   },
// }));
