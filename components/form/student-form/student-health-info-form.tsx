import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "@/types/student-form";
import { studentSchema } from "@/schema/student";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HealthInfoForm({
  onNext,
  onPrev,
  formData,
  setFormData,
}: StepProps) {
  const healthInfoSchema = z.object({
    hobbies: z.array(z.string()).optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
      .optional(),
    illnesses: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
  });

  type HealthInfoFormData = z.infer<typeof healthInfoSchema>;

  const healthInfoForm = useForm<HealthInfoFormData>({
    resolver: zodResolver(healthInfoSchema),
    defaultValues: {
      hobbies: formData.hobbies,
      bloodGroup: formData.bloodGroup,
      illnesses: formData.illnesses,
      allergies: formData.allergies,
    },
  });

  const onClickPrev = (data: HealthInfoFormData) => {
    setFormData(data);
    onPrev?.();
  };

  const onSubmit = (data: HealthInfoFormData) => {
    setFormData(data);
    onNext?.();
  };

  return (
    <Form {...healthInfoForm}>
      <form onSubmit={healthInfoForm.handleSubmit(onSubmit)}>
        <FormField
          control={healthInfoForm.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter hobbies separated by commas (e.g., Reading, Sports, Music)"
                  {...field}
                  value={field.value ? field.value.join(", ") : ""}
                  onChange={(e) => {
                    const hobbies = e.target.value
                      .split(",")
                      .map((hobby) => hobby.trim())
                      .filter((hobby) => hobby);
                    field.onChange(hobbies);
                  }}
                />
              </FormControl>
              <FormDescription>
                Student's hobbies and interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={healthInfoForm.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Student's blood group for medical records.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={healthInfoForm.control}
          name="illnesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Illnesses</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter illnesses separated by commas (e.g., Asthma, Diabetes)"
                  {...field}
                  value={field.value ? field.value.join(", ") : ""}
                  onChange={(e) => {
                    const illnesses = e.target.value
                      .split(",")
                      .map((illness) => illness.trim())
                      .filter((illness) => illness);
                    field.onChange(illnesses);
                  }}
                />
              </FormControl>
              <FormDescription>
                Known illnesses or medical conditions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={healthInfoForm.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter allergies separated by commas (e.g., Peanuts, Dust)"
                  {...field}
                  value={field.value ? field.value.join(", ") : ""}
                  onChange={(e) => {
                    const allergies = e.target.value
                      .split(",")
                      .map((allergy) => allergy.trim())
                      .filter((allergy) => allergy);
                    field.onChange(allergies);
                  }}
                />
              </FormControl>
              <FormDescription>Known allergies.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          onClick={() => onClickPrev(healthInfoForm.getValues())}
          className="mr-2"
        >
          back
        </Button>
        <Button type="submit">Nexto</Button>
      </form>
    </Form>
  );
}
