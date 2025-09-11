import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ShadcnModalProps = {
  triggerComponent?: React.ReactNode;
  title: string;
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  showFooter?: boolean;
  showCancleButton?: boolean;
  showSubmitButton?: boolean;
}

export function ShadcnModal({
  triggerComponent,
  title,
  description,
  submitButtonText = "Save changes",
  cancelButtonText = "Cancel",
  onSubmit = () => { },
  onCancel = () => { },
  showFooter = true,
  showCancleButton = true,
  showSubmitButton = true,
  children,
}: ShadcnModalProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {triggerComponent}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title || "Enter modal title"}</DialogTitle>
            <DialogDescription>
              {description || "Enter modal description"}
            </DialogDescription>
          </DialogHeader>
          <div className="modal-contents">
            {children}
          </div>
          {showFooter && (
            <DialogFooter>
              {showCancleButton && (
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={onCancel}
                  >
                    {cancelButtonText || "Cancel"}
                  </Button>
                </DialogClose>
              )}

              {showSubmitButton && (
                <Button
                  onClick={onSubmit}
                  type="submit"
                >
                  {submitButtonText || "Save changes"}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </Dialog>
  )
}
