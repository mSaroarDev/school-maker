import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";

type DrawerProps = {
  showModal?: boolean;
  setShowModal?: (show: boolean) => void;
  onSubmit?: (f: React.FormEvent<HTMLFormElement>) => void;
  isPending?: boolean;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Drawer = ({
  showModal = false,
  setShowModal = () => { },
  onSubmit = (f: React.FormEvent<HTMLFormElement>) => f,
  isPending = false,
  isSubmitting = false,

  title = "Enter Title here",
  description = "Enter description here",

  children = <div></div>,
}: DrawerProps) => {
  return (
    <>
      <Sheet open={showModal} modal={false}>

        <SheetContent className="overflow-y-auto [&>button]:hidden">
          <>
            <form
              onSubmit={onSubmit}
              className="h-full flex flex-col"
            >
              <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>
                  {description}
                </SheetDescription>
                <SheetClose asChild>
                  <button
                    className="absolute right-4 top-4 more-action-button"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-4 px-4">
                {children}
              </div>


              <SheetFooter>
                <Button
                  type="submit"
                  isLoading={isPending || isSubmitting}
                >
                  Save changes
                </Button>
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Drawer;