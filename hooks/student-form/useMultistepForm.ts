import { useState, useEffect, useCallback } from "react";
import { useFormPersistence } from "./useFormPersistence";
import { StepConfig } from "@/types/student-form";
import { StudentFormData } from "@/types/student-form";
import { toast } from "sonner"; // Import toast
import { ZodError } from "zod";

export const useMultistepForm = (steps: StepConfig[]) => {
  const {
    saveFormData,
    loadFormData,
    saveProgress,
    loadProgress,
    clearStorage,
  } = useFormPersistence();

  const [formData, setFormDataState] = useState<StudentFormData>(() => ({
    // Default values
    name: { firstName: "", middleName: "", lastName: "" },
    profileImageUrl: "",
    dateOfBirth: new Date(),
    studentId: "",
    isPermanentId: true,
    hobbies: [],
    status: "Tested",
    isSatsangi: true,
    isBAPSSatsangi: false,
    yearsOfSatsang: 0,

    fatherName: { firstName: "", middleName: "", lastName: "" },
    fatherMobileNumber: "",
    fatherOccupation: "",
    motherName: { firstName: "", middleName: "", lastName: "" },
    motherMobileNumber: "",
    motherOccupation: "",
    address: {
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },

    bloodGroup: "A+",
    illnesses: [],
    allergies: [],

    admissionYear: "",
    schoolRollNo: 0,
    standard: 0,
    medium: "Gujarati",
    lastExamGiven: "",
    lastExamPercentage: 0,
    admissionDate: new Date(),
  }));

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const progress = loadProgress();
    setCurrentStep(progress.currentStep);
    setCompletedSteps(progress.completedSteps);
  }, [loadProgress]);

  // Save progress when changed
  useEffect(() => {
    saveProgress(currentStep, completedSteps);
  }, [currentStep, completedSteps, saveProgress]);

  const setFormData = useCallback(
    (data: Partial<StudentFormData>) => {
      setFormDataState((prev) => {
        const updated = { ...prev, ...data };
        saveFormData(updated); // Auto-save on change
        return updated;
      });
    },
    [saveFormData]
  );

  const validateCurrentStep = useCallback(async (): Promise<{ isValid: boolean; errors?: ZodError }> => {
    const currentStepConfig = steps[currentStep];
    if (!currentStepConfig) return { isValid: false };

    try {
      setIsLoading(true);
      await currentStepConfig.validation.parseAsync(formData);
      return { isValid: true };
    } catch (error) {
      if (error instanceof ZodError) {
        // Return the ZodError for field-level handling
        return { isValid: false, errors: error };
      }
      
      // For non-Zod errors, show a general toast
      toast.error("Validation Failed", {
        description: "Please check all required fields are filled correctly.",
        duration: 3000,
      });
      
      // Only log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Step validation failed:", error);
      }
      
      return { isValid: false };
    } finally {
      setIsLoading(false);
    }
  }, [currentStep, formData, steps]);

  const goToNext = useCallback(async () => {
    const validation = await validateCurrentStep();
    if (!validation.isValid) return { success: false, errors: validation.errors };

    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      
      // Show success toast
      toast.success("Step Completed", {
        description: `Step ${currentStep + 1} completed successfully!`,
        duration: 2000,
      });
    }
    return { success: true };
  }, [currentStep, steps.length, validateCurrentStep]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    async (stepIndex: number) => {
      // Only allow navigation to completed steps or next step
      if (
        stepIndex <= Math.max(...completedSteps) + 1 &&
        stepIndex >= 0 &&
        stepIndex < steps.length
      ) {
        setCurrentStep(stepIndex);
        return true;
      } else {
        toast.warning("Navigation Restricted", {
          description: "Please complete the current step before proceeding.",
          duration: 3000,
        });
        return false;
      }
    },
    [completedSteps, steps.length]
  );

  const submitForm = useCallback(async () => {
    // Validate all steps
    for (const step of steps) {
      try {
        await step.validation.parseAsync(formData);
      } catch (error) {
        if (error instanceof ZodError) {
          toast.error("Form Submission Failed", {
            description: `Please fix validation errors in step: ${step.id}`,
            duration: 5000,
          });
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.error(`Validation failed for step ${step.id}:`, error);
        }
        return false;
      }
    }

    // Submit logic here
    console.log("Form submitted:", formData);
    toast.success("Form Submitted Successfully!", {
      description: "Your form has been submitted successfully.",
      duration: 3000,
    });
    clearStorage(); // Clear after successful submission
    return true;
  }, [formData, steps, clearStorage]);

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setFormDataState({
      name: { firstName: "", middleName: "", lastName: "" },
      profileImageUrl: "",
      dateOfBirth: new Date(),
      studentId: "",
      isPermanentId: true,
      hobbies: [],
      status: "Pending",
      isSatsangi: true,
      isBAPSSatsangi: false,
      yearsOfSatsang: 0,

      fatherName: { firstName: "", middleName: "", lastName: "" },
      fatherMobileNumber: "",
      fatherOccupation: "",
      motherName: { firstName: "", middleName: "", lastName: "" },
      motherMobileNumber: "",
      motherOccupation: "",
      address: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      },

      bloodGroup: "A+",
      illnesses: [],
      allergies: [],

      admissionYear: "",
      schoolRollNo: 0,
      standard: 0,
      medium: "Gujarati",
      lastExamGiven: "",
      lastExamPercentage: 0,
      admissionDate: new Date(),
    });
    clearStorage();
    
    toast.success("Form Reset", {
      description: "Form has been reset successfully.",
      duration: 2000,
    });
  }, [clearStorage]);

  return {
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
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    currentStepConfig: steps[currentStep],
    progress: ((currentStep + 1) / steps.length) * 100,
  };
};


// import { useState, useEffect, useCallback } from "react";
// import { useFormPersistence } from "./useFormPersistence";
// import { StepConfig } from "@/types/student-form";
// import { StudentFormData } from "@/types/student-form";

// export const useMultistepForm = (steps: StepConfig[]) => {
//   const {
//     saveFormData,
//     loadFormData,
//     saveProgress,
//     loadProgress,
//     clearStorage,
//   } = useFormPersistence();

//   const [formData, setFormDataState] = useState<StudentFormData>(() => ({
//     // Default values
//     name: { firstName: "", middleName: "", lastName: "" },
//     profileImageUrl: "",
//     dateOfBirth: new Date(),
//     studentId: "",
//     isPermanentId: true,
//     hobbies: [],
//     status: "Tested",
//     isSatsangi: true,
//     isBAPSSatsangi: false,
//     yearsOfSatsang: 0,

//     fatherName: { firstName: "", middleName: "", lastName: "" },
//     fatherMobileNumber: "",
//     fatherOccupation: "",
//     motherName: { firstName: "", middleName: "", lastName: "" },
//     motherMobileNumber: "",
//     motherOccupation: "",
//     address: {
//       address: "",
//       city: "",
//       state: "",
//       pinCode: "",
//       country: "",
//     },

//     bloodGroup: "-",
//     illnesses: [],
//     allergies: [],

//     admissionYear: "",
//     schoolRollNo: 0,
//     standard: 0,
//     medium: "Gujarati",
//     lastExamGiven: "",
//     lastExamPercentage: 0,
//     admissionDate: new Date(),
//   }));

//   const [currentStep, setCurrentStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Load progress on mount
//   useEffect(() => {
//     const progress = loadProgress();
//     setCurrentStep(progress.currentStep);
//     setCompletedSteps(progress.completedSteps);
//   }, [loadProgress]);

//   // Save progress when changed
//   useEffect(() => {
//     saveProgress(currentStep, completedSteps);
//   }, [currentStep, completedSteps, saveProgress]);

//   const setFormData = useCallback(
//     (data: Partial<StudentFormData>) => {
//       setFormDataState((prev) => {
//         const updated = { ...prev, ...data };
//         saveFormData(updated); // Auto-save on change
//         return updated;
//       });
//     },
//     [saveFormData]
//   );

//   const validateCurrentStep = useCallback(async (): Promise<boolean> => {
//     const currentStepConfig = steps[currentStep];
//     if (!currentStepConfig) return false;

//     try {
//       setIsLoading(true);
//       await currentStepConfig.validation.parseAsync(formData);
//       return true;
//     } catch (error) {
//       console.error("Step validation failed:", error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentStep, formData, steps]);

//   const goToNext = useCallback(async () => {
//     const isValid = await validateCurrentStep();
//     if (!isValid) return false;

//     const nextStep = currentStep + 1;
//     if (nextStep < steps.length) {
//       setCurrentStep(nextStep);
//       setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
//     }
//     return true;
//   }, [currentStep, steps.length, validateCurrentStep]);

//   const goToPrevious = useCallback(() => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   }, [currentStep]);

//   const goToStep = useCallback(
//     async (stepIndex: number) => {
//       // Only allow navigation to completed steps or next step
//       if (
//         stepIndex <= Math.max(...completedSteps) + 1 &&
//         stepIndex >= 0 &&
//         stepIndex < steps.length
//       ) {
//         setCurrentStep(stepIndex);
//         return true;
//       }
//       return false;
//     },
//     [completedSteps, steps.length]
//   );

//   const submitForm = useCallback(async () => {
//     // Validate all steps
//     for (const step of steps) {
//       try {
//         await step.validation.parseAsync(formData);
//       } catch (error) {
//         console.error(`Validation failed for step ${step.id}:`, error);
//         return false;
//       }
//     }

//     // Submit logic here
//     console.log("Form submitted:", formData);
//     clearStorage(); // Clear after successful submission
//     return true;
//   }, [formData, steps, clearStorage]);

//   const resetForm = useCallback(() => {
//     setCurrentStep(0);
//     setCompletedSteps([]);
//     setFormDataState({
//       name: { firstName: "", middleName: "", lastName: "" },
//       profileImageUrl: "",
//       dateOfBirth: new Date(),
//       studentId: "",
//       isPermanentId: true,
//       hobbies: [],
//       status: "Pending",
//       isSatsangi: true,
//       isBAPSSatsangi: false,
//       yearsOfSatsang: 0,

//       fatherName: { firstName: "", middleName: "", lastName: "" },
//       fatherMobileNumber: "",
//       fatherOccupation: "",
//       motherName: { firstName: "", middleName: "", lastName: "" },
//       motherMobileNumber: "",
//       motherOccupation: "",
//       address: {
//         address: "",
//         city: "",
//         state: "",
//         pinCode: "",
//         country: "",
//       },

//       bloodGroup: "-",
//       illnesses: [],
//       allergies: [],

//       admissionYear: "",
//       schoolRollNo: 0,
//       standard: 0,
//       medium: "Gujarati",
//       lastExamGiven: "",
//       lastExamPercentage: 0,
//       admissionDate: new Date(),
//     });
//     clearStorage();
//   }, [clearStorage]);

//   return {
//     formData,
//     setFormData,
//     currentStep,
//     completedSteps,
//     isLoading,
//     goToNext,
//     goToPrevious,
//     goToStep,
//     submitForm,
//     resetForm,
//     validateCurrentStep,
//     isFirstStep: currentStep === 0,
//     isLastStep: currentStep === steps.length - 1,
//     currentStepConfig: steps[currentStep],
//     progress: ((currentStep + 1) / steps.length) * 100,
//   };
// };
