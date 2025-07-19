// types/index.ts
export interface Student {
  id: string;
  name: string;
  standard: string;
  medium: string;
  departmentId: string | null;
  photo?: string;
}

export interface Department {
  id: string;
  name: string;
}