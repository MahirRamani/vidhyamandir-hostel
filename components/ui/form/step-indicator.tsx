import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Step } from '@/types/student-form';

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const IconComponent = step.icon;
        
        return (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2
              ${isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : isCurrent 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-gray-200 border-gray-300 text-gray-400'
              }
            `}>
              {isCompleted ? (
                <CheckCircle size={20} />
              ) : (
                <IconComponent size={20} />
              )}
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${
                isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}