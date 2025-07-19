import { useMultistepForm } from "@/hooks/student-form/useMultistepForm";
import { BasicInfoForm } from "./steps/BasicInfoForm";
import { FamilyInfoForm } from "./steps/FamilyInfoForm";
import { HealthInfoForm } from "./steps/HealthInfoForm";
import { AcademicInfoForm } from "./steps/AcademicInfoForm";
import {
  basicInfoSchema,
  familyInfoSchema,
  healthInfoSchema,
  academicInfoSchema,
} from "@/schema/student-form";
import { Button } from "@/components/ui/button";

const FORM_STEPS = [
  {
    id: "basic-info",
    title: "Basic Information",
    component: BasicInfoForm,
    validation: basicInfoSchema,
  },
  {
    id: "family-info",
    title: "Family Information",
    component: FamilyInfoForm,
    validation: familyInfoSchema,
  },
  {
    id: "health-info",
    title: "Health Information",
    component: HealthInfoForm,
    validation: healthInfoSchema,
  },
  {
    id: "academic-info",
    title: "Academic Information",
    component: AcademicInfoForm,
    validation: academicInfoSchema,
  },
];

export function MultistepForm() {
  const {
    formData,
    setFormData,
    currentStep,
    completedSteps,
    isLoading,
    goToNext,
    goToPrevious,
    goToStep,
    submitForm,
    resetForm,
    validateCurrentStep,
    isFirstStep,
    isLastStep,
    currentStepConfig,
    progress,
  } = useMultistepForm(FORM_STEPS);

  const CurrentStepComponent = currentStepConfig?.component;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {FORM_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${
                index === currentStep
                  ? "bg-blue-500 text-white"
                  : completedSteps.includes(index)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              disabled={index > Math.max(...completedSteps) + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{currentStepConfig?.title}</h2>
        {CurrentStepComponent && (
          <CurrentStepComponent
            onNext={goToNext}
            onBack={goToPrevious}
            formData={formData}
            setFormData={setFormData}
            isValid={true}
            validateStep={validateCurrentStep}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={goToPrevious} disabled={isFirstStep}>
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={resetForm}>
            Reset
          </Button>

          {isLastStep ? (
            <Button onClick={submitForm} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          ) : (
            <Button onClick={goToNext} disabled={isLoading}>
              {isLoading ? "Validating..." : "Next"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
