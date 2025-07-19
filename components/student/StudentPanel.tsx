import React, { memo, useMemo } from 'react';
import { useStudentStore } from '@/store/useStudentStore';
import { StudentProfileTile } from './StudentProfileTile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users } from 'lucide-react';
import { Student } from '@/types';

export const StudentPanel = () => {
  const unassignedStudents = useStudentStore((state) => state.getUnassignedStudents());
  
  const memoizedStudents = useMemo(() => unassignedStudents, [unassignedStudents]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Available Students ({memoizedStudents.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3 p-4">
            {memoizedStudents.map((student: Student) => (
              <StudentProfileTile
                key={student.id}
                student={student}
                isDraggable={true}
              />
            ))}
            {memoizedStudents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No unassigned students available</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

StudentPanel.displayName = 'StudentPanel';