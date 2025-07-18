import MainLayout from "@/components/layout/main-layout"
import StudentCard from '../../components/student-panel/student-card';


export default function Departments() {
    return (
        <MainLayout title="Department Allocation Dashboard" subtitle="Manage student department assignments with drag and drop">
      <div className="flex h-full">
        {/* Students Panel */}
        {/* <StudentsPanel
          students={unassignedStudents}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        /> */}

                
            <StudentCard />

        {/* Main Content */}
        
                
                
      </div>

      {/* Dialogs */}
      {/* <AddDepartmentDialog open={addDepartmentOpen} onOpenChange={setAddDepartmentOpen} />
      <EditDepartmentDialog
        open={editDepartmentOpen}
        onOpenChange={setEditDepartmentOpen}
        department={departmentToEdit}
      />
      <ConfirmationDialog
        open={confirmUnassignOpen}
        onOpenChange={setConfirmUnassignOpen}
        onConfirm={confirmRemoveStudent}
        title="Confirm Unassignment"
        description="Are you sure you want to unassign this student from their department?"
      /> */}
    </MainLayout>
  )
}