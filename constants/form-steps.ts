import { User, Lock, Mail, GraduationCap } from 'lucide-react';
import { Step } from '../types/student-form';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Basic Information",
    icon: User,
  },
  {
    id: 2,
    title: "Family Information",
    icon: Lock,
  },
  {
    id: 3,
    title: "Health Information",
    icon: Mail,
  },
  {
    id: 4,
    title: "Academic Information",
    icon: GraduationCap,
  },
];