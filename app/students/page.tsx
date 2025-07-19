"use client";
import MainLayout from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import MultiStepOnboarding from "@/components/form/student-form/student-form";
import { MultistepForm } from '../../components/form/student-form/MultistepForm';

export default function Students() {
  return (
    <MainLayout
      title="Students Management"
      subtitle="Manage student records and room assignments"
    >
      <div className="p-6 space-y-6">
        {/* <MultiStepOnboarding /> */}
        <MultistepForm />
      </div>
    </MainLayout>
    // <MainLayout
    //   title="Students Management"
    //   subtitle="Manage student records and room assignments"
    //   actions={
    //     <Button onClick={() => setAddStudentOpen(true)}>
    //       <Plus className="h-4 w-4 mr-2" />
    //       Add Student
    //     </Button>
    //   }
    // >
    //   <div className="p-6 space-y-6">
    //     <div className="flex items-center space-x-4">
    //       <div className="relative flex-1 max-w-md">
    //         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    //         <Input
    //           placeholder="Search students..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           className="pl-10"
    //         />
    //       </div>
    //       <div className="flex space-x-4 text-sm">
    //         <Badge variant="outline">Total: {students.length}</Badge>
    //         <Badge variant="default">Assigned: {assignedStudents.length}</Badge>
    //         <Badge variant="secondary">
    //           Unassigned: {unassignedStudents.length}
    //         </Badge>
    //       </div>
    //     </div>

    // </div>

    // </MainLayout>
  );
}
