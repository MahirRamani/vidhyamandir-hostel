import React, { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Student } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, User } from 'lucide-react';

interface StudentProfileTileProps {
  student: Student;
  onRemove?: (studentId: string) => void;
  isDraggable?: boolean;
}

export const StudentProfileTile = memo<StudentProfileTileProps>(({ 
  student, 
  onRemove, 
  isDraggable = true 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: student.id,
    data: {
      type: 'student',
      student,
    },
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`w-full max-w-sm transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
      } ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
            )}
            {onRemove && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(student.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{student.name}</h3>
            <p className="text-xs text-gray-600 mb-2">ID: {student.id}</p>
            
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {student.standard}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {student.medium}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StudentProfileTile.displayName = 'StudentProfileTile';