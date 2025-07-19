import React, { memo, useState, useCallback } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useStudentStore } from '@/store/useStudentStore';
import { StudentProfileTile } from '@/components/student/StudentProfileTile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit2, Check, X, Plus, Trash2 } from 'lucide-react';

interface EditableDepartmentNameProps {
  departmentId: string;
  currentName: string;
  onUpdate: (id: string, name: string) => void;
}

const EditableDepartmentName = memo<EditableDepartmentNameProps>(({ 
  departmentId, 
  currentName, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentName);

  const handleSave = useCallback(() => {
    if (editValue.trim() && editValue !== currentName) {
      onUpdate(departmentId, editValue.trim());
    }
    setIsEditing(false);
  }, [editValue, currentName, departmentId, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditValue(currentName);
    setIsEditing(false);
  }, [currentName]);

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-8"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
        />
        <Button size="sm" variant="outline" onClick={handleSave}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{currentName}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="h-8 w-8 p-0"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
});

EditableDepartmentName.displayName = 'EditableDepartmentName';

interface DroppableTabContentProps {
  departmentId: string;
  departmentName: string;
  students: any[];
  onRemoveStudent: (studentId: string) => void;
  onUpdateDepartment: (id: string, name: string) => void;
}

const DroppableTabContent = memo<DroppableTabContentProps>(({ 
  departmentId, 
  departmentName, 
  students, 
  onRemoveStudent,
  onUpdateDepartment 
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: departmentId,
    data: {
      type: 'department',
      departmentId,
    },
  });

  return (
    <Card 
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <EditableDepartmentName
            departmentId={departmentId}
            currentName={departmentName}
            onUpdate={onUpdateDepartment}
          />
          <span className="text-sm font-normal text-gray-500">
            {students.length} students
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {students.map((student) => (
              <StudentProfileTile
                key={student.id}
                student={student}
                onRemove={onRemoveStudent}
                isDraggable={false}
              />
            ))}
            {students.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <p>Drop students here to assign them to {departmentName}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
});

DroppableTabContent.displayName = 'DroppableTabContent';

export const DepartmentTabs = memo(() => {
  const { 
    departments, 
    getStudentsByDepartment, 
    assignStudentToDepartment,
    updateDepartment 
  } = useStudentStore();

  const handleRemoveStudent = useCallback((studentId: string) => {
    assignStudentToDepartment(studentId, null);
  }, [assignStudentToDepartment]);

  const handleUpdateDepartment = useCallback((id: string, name: string) => {
    updateDepartment(id, { name });
  }, [updateDepartment]);

  return (
    <Tabs defaultValue={departments[0]?.id} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {departments.map((dept) => (
          <TabsTrigger key={dept.id} value={dept.id} className="text-sm">
            {dept.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {departments.map((dept) => (
        <TabsContent key={dept.id} value={dept.id} className="mt-4">
          <DroppableTabContent
            departmentId={dept.id}
            departmentName={dept.name}
            students={getStudentsByDepartment(dept.id)}
            onRemoveStudent={handleRemoveStudent}
            onUpdateDepartment={handleUpdateDepartment}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
});

DepartmentTabs.displayName = 'DepartmentTabs';