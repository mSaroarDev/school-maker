import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LuPlus } from "react-icons/lu";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const ClassCreateModal = () => {

  const defaultValues = {
    displayName: "",
    classValue: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues
  });


  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Sheet>
        <SheetTrigger asChild>
          <button className="header-buttons"><LuPlus size={18} /></button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Class</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Not Reversible.</AlertTitle>
                <AlertDescription>
                  <p>Be awar that after creating a new class you cant update or delete it.</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>Check your Spelling</li>
                    <li>Create with proper sequence.</li>
                    <li>Verify before submit</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="mt-5">
                <div>
                  <Label>Display Name</Label>
                  <Input 
                    {...register("displayName", { required: "Display Name is required" })}
                    className={`${errors.displayName ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}`}
                    placeholder="Class 01"
                  />
                  {errors.displayName && <p className="text-sm text-destructive mt-1">{errors.displayName.message}</p>}
                </div>

                <div>
                  <Label className="mt-4">Class Value</Label>
                  <Input 
                    {...register("classValue", { required: "Class Value is required" })}
                    className={`${errors.classValue ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}`}
                    placeholder="01"
                  />
                  {errors.classValue && <p className="text-sm text-destructive mt-1">{errors.classValue.message}</p>}
                </div>
              </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button 
                isLoading={isSubmitting} 
                disabled={isSubmitting || Object.keys(errors).length > 0 || defaultValues.displayName === "" || defaultValues.classValue === ""} 
                type="button" 
                variant="outline"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </form>
  );
};

export default ClassCreateModal;