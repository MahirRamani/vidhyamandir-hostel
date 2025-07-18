import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BasicInfoForm } from "@/components/form/student-form/student-basic-info-form";
import { ProgressBar } from "@/components/ui/form/progress-bar";
import { StepIndicator } from "@/components/ui/form/step-indicator";
import { CompletionScreen } from "@/components/form/completion-screen";
import { STEPS } from "@/constants/form-steps";
import { studentFormData } from "@/types/student-form";
import { AcademicInfoForm } from "./student-academic-info-form";
import { HealthInfoForm } from "./student-health-info-form";
import { FamilyInfoForm } from "./student-family-info-form";

export default function MultiStepOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Partial<studentFormData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = (finalData: studentFormData) => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    setIsComplete(true);
    console.log("Form completed with data:", finalData);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setFormData({});
    setIsComplete(false);
  };

  if (isComplete) {
    return <CompletionScreen formData={formData} onReset={resetForm} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Create Your Account</CardTitle>
            <Badge variant="secondary">
              Step {currentStep} of {STEPS.length}
            </Badge>
          </div>

          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </CardHeader>

        <CardContent>
          {currentStep === 1 && (
            <BasicInfoForm
              onNext={nextStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentStep === 2 && (
            <FamilyInfoForm
              onNext={nextStep}
              onPrev={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentStep === 3 && (
            <HealthInfoForm
              onNext={nextStep}
              onPrev={prevStep}
              formData={formData}
              setFormData={setFormData} />
          )}
          
          {currentStep === 4 && (
            <AcademicInfoForm
              onNext={nextStep} onPrev={prevStep} formData={formData}
              setFormData={setFormData} />
          )}
        </CardContent>
      </Card>

      {/* Debug Panel */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm">Debug Info</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="space-y-2">
            <p>
              <strong>Current Step:</strong> {currentStep} of {STEPS.length}
            </p>
            <p>
              <strong>Completed Steps:</strong>{" "}
              {completedSteps.join(", ") || "None"}
            </p>
            <p>
              <strong>Form Data:</strong>
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
