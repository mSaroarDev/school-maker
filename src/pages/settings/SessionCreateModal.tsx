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
} from "@/components/ui/sheet";
import { LuPlus } from "react-icons/lu";

import { useCreateSession } from "@/api/session/sessions.hooks";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { AlertCircleIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const SessionCreateModal = () => {

  const sheetContentRef = useRef<HTMLDivElement>(null);
  const [showCreatModal, setShowCreateModal] = useState(false);

  const defaultValues = {
    sessionName: "",
    year: null as number | null
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues
  });

  const { mutateAsync: createSession, isPending } = useCreateSession();

  const onSubmit = (data: typeof defaultValues) => {
    showConfirmModal({
      title: "Confirm?",
      text: "This action is irreversible. Please double-check the information before proceeding.",
      target: sheetContentRef.current || undefined, 
      func: async () => {
        try {
          const res = await createSession(data);
          if (res?.success) {
            showToast("success", res?.message || "Class created successfully");
            setShowCreateModal(false);
            reset();
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error) || "Failed to create class");
        }
      },
    })
  }

  return (
      <Sheet open={showCreatModal} onOpenChange={setShowCreateModal}>
        <SheetTrigger asChild>
          <button className="header-buttons"><LuPlus size={18} /></button>
        </SheetTrigger>
        <SheetContent className="h-full flex flex-col gap-4" ref={sheetContentRef}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
            <SheetHeader>
              <SheetTitle>Create New Session</SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Not Reversible.</AlertTitle>
                <AlertDescription>
                  <p>Be awar that after creating a new session you cant update or delete it.</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>Check your Spelling</li>
                    <li>Create with proper sequence.</li>
                    <li>Verify before submit</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="mt-5">
                <div>
                  <Label>Session Name</Label>
                  <Input
                    {...register("sessionName", { required: "Session Name is required" })}
                    className={`${errors.sessionName ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}`}
                    placeholder="2023-2024"
                  />
                  {errors.sessionName && <p className="text-sm text-destructive mt-1">{errors.sessionName.message}</p>}
                </div>

                <div>
                  <Label className="mt-4">Current Year</Label>
                  <Input
                    type="number"
                    {...register("year", { 
                      required: "Class Value is required",
                      valueAsNumber: true,
                      min: { value: 2000, message: "Year must be at least 2000" },
                      max: { value: 2100, message: "Year must be at most 2100" }
                    })}
                    className={`${errors.year ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}`}
                    placeholder="2023"
                  />
                  {errors.year && <p className="text-sm text-destructive mt-1">{errors.year.message}</p>}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button
                  isLoading={isSubmitting}
                  disabled={isPending || isSubmitting}
                  type="button"
                  variant="outline"
                >
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
  );
};

export default SessionCreateModal;