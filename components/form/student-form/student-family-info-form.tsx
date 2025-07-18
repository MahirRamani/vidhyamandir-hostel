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
import { Textarea } from "@/components/ui/textarea";

export function FamilyInfoForm({
  onNext,
  onPrev,
  formData,
  setFormData,
}: StepProps) {
  const familyInfoSchema = z.object({
    fatherName: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
    }),
    fatherMobileNumber: z.string(),
    fatherOccupation: z.string(),
    motherName: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
    }),
    motherMobileNumber: z.string().optional(),
    motherOccupation: z.string().optional(),
    address: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      pinCode: z.string(),
      country: z.string(),
    }),
  });

  type FamilyInfoFormData = z.infer<typeof familyInfoSchema>;

  const familyInfoForm = useForm<FamilyInfoFormData>({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: {
      fatherName: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      fatherMobileNumber: "",
      fatherOccupation: "",
      motherName: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      motherMobileNumber: "",
      motherOccupation: "",
      address: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      },
    },
  });

  const onClickPrev = (data: FamilyInfoFormData) => {
    setFormData(data);
    onPrev?.();
  };

  const onSubmit = (data: FamilyInfoFormData) => {
    // console.log(data);
    setFormData(data);
    onNext?.();
  };

  return (
    <Form {...familyInfoForm}>
      <form onSubmit={familyInfoForm.handleSubmit(onSubmit)}>
        <FormField
          control={familyInfoForm.control}
          name="fatherName.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter father's first name" {...field} />
              </FormControl>
              <FormDescription>Father's first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="fatherName.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter father's middle name" {...field} />
              </FormControl>
              <FormDescription>
                Father's middle name (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="fatherName.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter father's last name" {...field} />
              </FormControl>
              <FormDescription>Father's last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="fatherMobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 9876543210" {...field} />
              </FormControl>
              <FormDescription>Father's contact number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="fatherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter father's occupation" {...field} />
              </FormControl>
              <FormDescription>Father's profession or job.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        // Parents Tab Form Fields - Mother
        <FormField
          control={familyInfoForm.control}
          name="motherName.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter mother's first name" {...field} />
              </FormControl>
              <FormDescription>Mother's first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="motherName.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter mother's middle name" {...field} />
              </FormControl>
              <FormDescription>
                Mother's middle name (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="motherName.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter mother's last name" {...field} />
              </FormControl>
              <FormDescription>Mother's last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="motherMobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 9876543210" {...field} />
              </FormControl>
              <FormDescription>Mother's contact number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="motherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter mother's occupation" {...field} />
              </FormControl>
              <FormDescription>Mother's profession or job.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="address.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter street address" {...field} />
              </FormControl>
              <FormDescription>
                Complete street address including house number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="Enter city" {...field} />
              </FormControl>
              <FormDescription>City name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <FormControl>
                <Input placeholder="Enter state" {...field} />
              </FormControl>
              <FormDescription>State or province name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="address.pinCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pin Code *</FormLabel>
              <FormControl>
                <Input placeholder="Enter pin code" {...field} />
              </FormControl>
              <FormDescription>Postal code or PIN code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={familyInfoForm.control}
          name="address.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country *</FormLabel>
              <FormControl>
                <Input placeholder="Enter country" {...field} />
              </FormControl>
              <FormDescription>Country name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() => onClickPrev(familyInfoForm.getValues())}
          className="mr-2"
        >
          back
        </Button>
        <Button type="submit">Nexto</Button>
      </form>
    </Form>
  );
}
