import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { familyInfoSchema } from "@/schema/student-form";
import { StepProps } from "@/types/student-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FamilyInfoForm({ onNext, formData, setFormData, validateStep }: StepProps) {
  const form = useForm({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: {
      fatherName: {
        firstName: formData.fatherName.firstName,
        middleName: formData.fatherName.middleName,
        lastName: formData.fatherName.lastName,
      },
      fatherMobileNumber: formData.fatherMobileNumber,
      fatherOccupation: formData.fatherOccupation,
      motherName: {
        firstName: formData.motherName.firstName,
        middleName: formData.motherName.middleName,
        lastName: formData.motherName.lastName,
      },
      motherMobileNumber: formData.motherMobileNumber,
      motherOccupation: formData.motherOccupation,
      address: {
        address: formData.address.address,
        city: formData.address.city,
        state: formData.address.state,
        pinCode: formData.address.pinCode,
        country: formData.address.country,
      }

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
          name="fatherName.firstName"
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