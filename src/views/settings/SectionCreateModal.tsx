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
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { useRef, useState } from "react";
import { useCreateSection } from "@/api/sections/section.hooks";

const SectionsCreateModal = () => {

  const sheetContentRef = useRef<HTMLDivElement>(null);
  const [showCreatModal, setShowCreateModal] = useState(false);

  const defaultValues = {
    sectionName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues
  });

  const { mutateAsync: createSections, isPending } = useCreateSection();

  const onSubmit = (data: typeof defaultValues) => {
    showConfirmModal({
      title: "Confirm?",
      text: "This action is irreversible. Please double-check the information before proceeding.",
      target: sheetContentRef.current || undefined,
      func: async () => {
        try {
          const res = await createSections(data);
          if (res?.success) {
            showToast("success", res?.message || "Sections created successfully");
            setShowCreateModal(false);
            reset();
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error) || "Failed to create Sections");
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
            <SheetTitle>Create New Section</SheetTitle>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Not Reversible.</AlertTitle>
              <AlertDescription>
                <p>Be awar that after creating a new Sections you cant update or delete it.</p>
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
                  {...register("sectionName", { required: "Display Name is required" })}
                  className={`${errors.sectionName ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}`}
                  placeholder="A"
                />
                {errors.sectionName && <p className="text-sm text-destructive mt-1">{errors.sectionName.message}</p>}
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

export default SectionsCreateModal;