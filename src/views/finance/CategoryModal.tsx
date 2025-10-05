import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiSolidEdit } from "react-icons/bi";

const CategoryModal = () => {
  return (
    <>
      <div>
        <Label>Create New Category</Label>
        <div className="flex items-center gap-2">
          <Input
          type="text"
          placeholder="Category Name"
          className=""
        />
        <Button>Submit</Button>
        </div>
      </div>

      <h4 className="mt-5">My Categories</h4>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <div className="flex items-center gap-1 bg-primary/20 px-1">
          <div className="border-r border-black/40 pr-2">Category 1</div>
          <div className="cursor-pointer border-primary">
            <BiSolidEdit size={16} className="text-black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;