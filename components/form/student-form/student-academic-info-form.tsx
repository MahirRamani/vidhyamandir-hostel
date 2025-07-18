import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepProps } from "@/types/student-form";
import z from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function AcademicInfoForm({
  onNext,
  onPrev,
  formData,
  setFormData,
}: StepProps) {
  const academicInfoSchema = z.object({
    admissionYear: z.string().min(4, "Admission year is required"),
    schoolRollNo: z.string().min(1, "School roll number is required"),
    standard: z.number().min(1).max(12, "Standard must be between 1 and 12"),
    medium: z.enum(["Gujarati", "Hindi", "English"]),
    lastExamGiven: z.string().min(1, "Last exam given is required"),
    lastExamPercentage: z
      .number()
      .min(0)
      .max(100, "Percentage must be between 0 and 100"),
    addmissionDate: z.date().min(1, "Admission date is required"),
  });

  type AcademicInfoFormData = z.infer<typeof academicInfoSchema>;

  const academicInfoForm = useForm<AcademicInfoFormData>({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      admissionYear: formData?.admissionYear || "",
      schoolRollNo: formData?.schoolRollNo || "",
      standard: formData?.standard || 0,
      medium: formData?.medium || "Gujarati",
      lastExamGiven: formData?.lastExamGiven || "",
      lastExamPercentage: formData?.lastExamPercentage || 0,
      addmissionDate: formData?.addmissionDate || new Date(),
    },
  });

  const onClickPrev = (data: AcademicInfoFormData) => {
    setFormData(data);
    onPrev?.();
  };

  const onSubmit = (data: AcademicInfoFormData) => {
    setFormData(data);
    onNext?.();
  };

  return (
    <Form {...academicInfoForm}>
      <form onSubmit={academicInfoForm.handleSubmit(onSubmit)}>
        <FormField
          control={academicInfoForm.control}
          name="schoolRollNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Roll No</FormLabel>
              <FormControl>
                <Input placeholder="School Roll No" {...field} />
              </FormControl>
              <FormDescription>This is your School Roll No.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={academicInfoForm.control}
          name="standard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard/Class *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Student's current standard or class.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={academicInfoForm.control}
          name="lastExamGiven"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Exam Given</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 10th Board, 12th Board" {...field} />
              </FormControl>
              <FormDescription>Name of the last exam taken.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={academicInfoForm.control}
          name="lastExamPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Exam Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 85.5"
                  step="0.1"
                  min="0"
                  max="100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Percentage scored in the last exam.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={academicInfoForm.control}
          name="addmissionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {/* {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )} */}
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Addmission date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          onClick={() => onClickPrev(academicInfoForm.getValues())}
          className="mr-2"
        >
          back
        </Button>
        <Button type="submit">Nexto</Button>
      </form>
    </Form>
  );
}
