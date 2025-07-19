import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicInfoSchema } from "@/schema/student-form";
import { StepProps } from "@/types/student-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AcademicInfoForm({ onNext, formData, setFormData, validateStep }: StepProps) {
  const form = useForm({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      admissionYear: formData.admissionYear,
      schoolRollNo: formData.schoolRollNo,
      standard: formData.standard,
      medium: formData.medium,
      lastExamGiven: formData.lastExamGiven,
      lastExamPercentage: formData.lastExamPercentage,
      admissionDate: formData.admissionDate,
    },
  });

  // Auto-save on field change
  const watchedValues = form.watch();
  useEffect(() => {
    setFormData(watchedValues);
  }, [watchedValues, setFormData]);

  const onSubmit = async (data: any) => {
    setFormData(data);
    const isValid = await validateStep();
    if (isValid && onNext) {
      onNext();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Your form fields here */}
        <FormField
          control={form.control}
          name="admissionYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}