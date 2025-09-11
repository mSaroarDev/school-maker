import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
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
  sideClick?: boolean;
}

export function Modal({
  isOpen,
  toggle,
  size = "md",
  title,
  description,
  submitButtonText = "Save changes",
  cancelButtonText = "Cancel",
  onSubmit = () => { },
  onCancel = () => { },
  showFooter = true,
  showCancleButton = true,
  showSubmitButton = true,
  sideClick = true,
  children,
}: ModalProps) {

  const sizeMap: Record<string, string> = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-lg",
    xl: "md:max-w-xl",
    "2xl": "md:max-w-2xl",
    "3xl": "md:max-w-3xl",
    "4xl": "md:max-w-4xl",
    "5xl": "md:max-w-5xl",
    "6xl": "md:max-w-6xl",
    "7xl": "md:max-w-7xl",
  };


  return (
    <Dialog
      open={isOpen}
      onOpenChange={toggle}
    >
      <form>
        <DialogContent
          className={`sm:max-w-[425px] ${size ? sizeMap[size] : ""} [&>button]:hidden`}
          onInteractOutside={(e) => {
            if (!sideClick) e.preventDefault();
          }}
        >
          <DialogHeader className="relative">
            <DialogTitle>{title || "Enter modal title"}</DialogTitle>
            <DialogDescription>
              {description || "Enter modal description"}
            </DialogDescription>

            <DialogClose asChild>
              <button
                className="absolute bg-white -top-8 -right-8 hover:-top-7 hover:-right-7 rounded w-8 h-8 grid place-items-center transition-all duration-200 cursor-pointer border-1"
              >
                <IoClose size={20} />
              </button>
            </DialogClose>
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
