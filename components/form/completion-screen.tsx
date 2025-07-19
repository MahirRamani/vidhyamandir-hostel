import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentFormData } from '@/types/student-form';

interface CompletionScreenProps {
  formData: Partial<StudentFormData>;
  onReset: () => void;
}

export function CompletionScreen({ formData, onReset }: CompletionScreenProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Registration Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome {formData.name?.firstName}! Your account has been created successfully.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Your Information:</h3>
            <div className="text-sm text-left space-y-1">
              <p><strong>Name:</strong> {formData.name?.firstName} { formData.name?.middleName} {formData.name?.lastName}</p>
              <p><strong>Date of Birth:</strong> {formData.dateOfBirth?.toISOString()}</p>
              {/* <p><strong>Profile:</strong> {formData.phone}</p> */}
              <p><strong>Student ID:</strong> {formData.studentId}</p>
              <p><strong>Permanent ID:</strong> {formData.isPermanentId ? 'Yes' : 'No'}</p>
            </div>
          </div>
          
          <Button onClick={onReset} variant="outline">
            Start New Registration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}