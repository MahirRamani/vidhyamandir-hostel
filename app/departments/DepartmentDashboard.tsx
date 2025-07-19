"use client";
import React, { memo, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import { StudentPanel } from '@/components/student/StudentPanel';
import { DepartmentTabs } from '@/components/department/DepartmentTabs';
import { StudentProfileTile } from '@/components/student/StudentProfileTile';
import { Student } from '@/types';

export const DepartmentDashboard = () => {
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const assignStudentToDepartment = useStudentStore((state) => state.assignStudentToDepartment);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    
    if (active.data.current?.type === 'student') {
      setActiveStudent(active.data.current.student);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveStudent(null);
    
    if (!over) return;
    
    const studentId = active.id as string;
    const overId = over.id as string;
    
    if (active.data.current?.type === 'student' && over.data.current?.type === 'department') {
      const departmentId = over.data.current.departmentId;
      assignStudentToDepartment(studentId, departmentId);
    }
  }, [assignStudentToDepartment]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header would go here */}
      <div className="flex-1 flex">
        {/* Sidebar would go here */}
        
        <div className="flex-1 flex">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Left side - Student Panel */}
            <div className="w-1/3 p-4 border-r">
              <StudentPanel />
            </div>
            
            {/* Right side - Department Tabs */}
            <div className="flex-1 p-4">
              <DepartmentTabs />
            </div>
            
            <DragOverlay>
              {activeStudent ? (
                <StudentProfileTile
                  student={activeStudent}
                  isDraggable={false}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

DepartmentDashboard.displayName = 'DepartmentDashboard';