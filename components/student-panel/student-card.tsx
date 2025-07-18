import React from 'react';
import { DoorOpen, BriefcaseBusiness } from 'lucide-react';

// Mock utility function
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Mock components
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const Avatar = ({ children, className }) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src }) => (
  <img 
    src={src} 
    alt="Student" 
    className="aspect-square h-full w-full object-cover"
    onError={(e) => {
      e.target.style.display = 'none';
    }}
  />
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
    {children}
  </div>
);

// Mock data and functions
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const sampleStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    hostelRollNo: "H2024001",
    medium: "English",
    roomId: "A-101",
    departmentId: "CSE",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b9179951?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Raj Patel",
    hostelRollNo: "H2024002",
    medium: "Hindi",
    roomId: "B-205",
    departmentId: "ECE",
    profileImageUrl: null
  },
  {
    id: 3,
    name: "Maria Garcia",
    hostelRollNo: null,
    medium: "Spanish",
    roomId: "C-310",
    departmentId: "ME",
    profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Chen Wei",
    hostelRollNo: "H2024004",
    medium: "English",
    roomId: null,
    departmentId: "IT",
    profileImageUrl: null
  }
];


const StudentCard = ({ student, className = "" }) => {
  const onDragStart = (e, student) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(student));
    console.log("Drag started for:", student.name);
  };

  const onDragEnd = () => {
    console.log("Drag ended");
  };

  return (
    <Card 
      className={cn("w-full cursor-grab active:cursor-grabbing", className)} 
      draggable 
      onDragStart={(e) => onDragStart(e, student)} 
      onDragEnd={onDragEnd}
    >
      <CardContent className="flex items-center gap-3 p-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={student.profileImageUrl || "/placeholder.svg?height=40&width=40"} />
          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">{student.name}</p>
          <p className="text-xs text-gray-500">
            {student.hostelRollNo ? `Roll No: ${student.hostelRollNo}` : "No Roll No"}
          </p>
          <p className="text-xs text-gray-500">Medium: {student.medium}</p>
          {student.roomId && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <DoorOpen className="h-3 w-3" />
              Room: {student.roomId}
            </p>
          )}
          {student.departmentId && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <BriefcaseBusiness className="h-3 w-3" />
              Department: {student.departmentId}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function StudentCardDemo() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Student Card UI Demo</h2>
      
      <div className="space-y-4 max-w-md">
        {sampleStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Features Demonstrated:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag and drop functionality (try dragging the cards)</li>
          <li>• Avatar with fallback initials</li>
          <li>• Conditional rendering for optional fields</li>
          <li>• Responsive design with proper spacing</li>
          <li>• Icons for room and department information</li>
        </ul>
      </div>
    </div>
  );
}