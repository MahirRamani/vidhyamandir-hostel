// store/useStudentStore.ts
import { create } from 'zustand';
import { Student, Department } from '../types';

interface StudentStore {
  students: Student[];
  departments: Department[];
  
  // Student actions
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  assignStudentToDepartment: (studentId: string, departmentId: string | null) => void;
  
  // Department actions
  addDepartment: (department: Department) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  removeDepartment: (id: string) => void;
  
  // Getters
  getStudentsByDepartment: (departmentId: string | null) => Student[];
  getUnassignedStudents: () => Student[];
}

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [
    {
      id: '1',
      name: 'John Doe',
      standard: '10th',
      medium: 'English',
      departmentId: null,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      standard: '12th',
      medium: 'Hindi',
      departmentId: null,
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      standard: '11th',
      medium: 'English',
      departmentId: null,
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      standard: '9th',
      medium: 'Gujarati',
      departmentId: null,
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
  ],
  
  departments: [
    { id: 'dept-1', name: 'Science' },
    { id: 'dept-2', name: 'Commerce' },
    { id: 'dept-3', name: 'Arts' },
  ],

  // Student actions
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),

  updateStudent: (id, updates) => set((state) => ({
    students: state.students.map(student =>
      student.id === id ? { ...student, ...updates } : student
    )
  })),

  removeStudent: (id) => set((state) => ({
    students: state.students.filter(student => student.id !== id)
  })),

  assignStudentToDepartment: (studentId, departmentId) => set((state) => ({
    students: state.students.map(student =>
      student.id === studentId ? { ...student, departmentId } : student
    )
  })),

  // Department actions
  addDepartment: (department) => set((state) => ({
    departments: [...state.departments, department]
  })),

  updateDepartment: (id, updates) => set((state) => ({
    departments: state.departments.map(dept =>
      dept.id === id ? { ...dept, ...updates } : dept
    )
  })),

  removeDepartment: (id) => set((state) => ({
    departments: state.departments.filter(dept => dept.id !== id),
    students: state.students.map(student =>
      student.departmentId === id ? { ...student, departmentId: null } : student
    )
  })),

  // Getters
  getStudentsByDepartment: (departmentId) => {
    const { students } = get();
    return students.filter(student => student.departmentId === departmentId);
  },

  getUnassignedStudents: () => {
    const { students } = get();
    return students.filter(student => student.departmentId === null);
  },
}));