import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema } from "@/schema/student-form";
import { StepProps } from "@/types/student-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

export function BasicInfoForm({
  onNext,
  formData,
  setFormData,
  validateStep,
}: StepProps) {
  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: {
        firstName: formData.name.firstName,
        middleName: formData.name.middleName,
        lastName: formData.name.lastName,
      },
      profileImageUrl: formData.profileImageUrl,
      dateOfBirth: formData.dateOfBirth,
      studentId: formData.studentId,
      isPermanentId: formData.isPermanentId,
      hobbies: formData.hobbies,
      status: formData.status,
      isSatsangi: formData.isSatsangi,
      isBAPSSatsangi: formData.isBAPSSatsangi,
      yearsOfSatsang: formData.yearsOfSatsang,
    },
  });

  //   // Auto-save on field change
  //   const watchedValues = form.watch();
  //   useEffect(() => {
  //     setFormData(watchedValues);
  //   }, [watchedValues, setFormData]);

  const debouncedSave = useCallback(
    debounce((data) => {
      setFormData(data);
    }, 300),
    [setFormData]
    );
    
    // Watch specific fields instead of all values
  const watchedValues = basicInfoForm.watch();
  
  useEffect(() => {
    // Only save if form is dirty (has changes)
    if (basicInfoForm.formState.isDirty) {
      debouncedSave(watchedValues);
    }
  }, [watchedValues, debouncedSave, basicInfoForm.formState.isDirty]);

  const onSubmit = async (data: any) => {
    setFormData(data);
    const isValid = await validateStep();
    if (isValid && onNext) {
      onNext();
    }
  };

  return (
    <Form {...basicInfoForm}>
      <form onSubmit={basicInfoForm.handleSubmit(onSubmit)}>
        {/* Your form fields here */}
        <FormField
          control={basicInfoForm.control}
          name="name.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormDescription>This is your first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="name.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" {...field} />
              </FormControl>
              <FormDescription>This is your middle name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="name.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormDescription>This is your Last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="profileImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} />
              </FormControl>
              <FormDescription>This is you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="dateOfBirth"
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
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., STU001 or TEMP001" {...field} />
              </FormControl>
              <FormDescription>
                Unique identifier for the student.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="isPermanentId"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Permanent ID</FormLabel>
                <FormDescription>
                  Is this a permanent student ID?
                </FormDescription>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
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
          control={basicInfoForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Tested">Tested</SelectItem>
                  <SelectItem value="NOC">NOC</SelectItem>
                  <SelectItem value="NOC-Cancel">NOC Cancel</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Current status of the student.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="isSatsangi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Satsangi</FormLabel>
                <FormDescription>Are you a satsangi?</FormDescription>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={basicInfoForm.control}
          name="isBAPSSatsangi"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">isBAPSSatsangi</FormLabel>
                <FormDescription>Are you a BAPS satsangi?</FormDescription>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={basicInfoForm.control}
          name="yearsOfSatsang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Satsang *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Number of years involved in satsang.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        {/* <Button type="submit">Next</Button> */}
      </form>
    </Form>
  );
}
