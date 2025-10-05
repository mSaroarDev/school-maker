import { useCreateFinanceCategory, useGetFinanceCategories, useUpdateFinanceCategory } from "@/api/financeCategory/financeCategory.hooks";
import { TFinanceCategory } from "@/api/financeCategory/financeCategory.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidEdit } from "react-icons/bi";

type CategoryModalProps = {
  type?: string;
}

const CategoryModal = ({
  type = "income"
}: CategoryModalProps) => {

  const defaultValues = {
    categoryName: "",
    type: type
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<TFinanceCategory | null>(null);

  const { mutateAsync: createFinanceCategory, isPending } = useCreateFinanceCategory();
  const { mutateAsync: updateFinanceCategory, isPending: isUpdating } = useUpdateFinanceCategory();
  const { data: categories, isPending: isLoadingCategories } = useGetFinanceCategories(type);

  const onSubmit = async (data: { categoryName: string; type: string }) => {
    if (!data.categoryName) return;

    const editPayload = {
      id: selectedCategory?._id || "",
      data: {
        categoryName: data.categoryName
      }
    }

    try {
      const res = isEditing ? await updateFinanceCategory(editPayload) : await createFinanceCategory(data);
      if (res?.success) {
        showToast("success", res?.message || "Category created successfully");
        reset();
        setIsEditing(false);
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to create category");
    }
  }

  return (
    <>
      <div>
        <Label>Create New Category</Label>
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <Input
              type="text"
              placeholder="Category Name"
              {...register("categoryName", { required: "Category name is required" })}
              className={errors.categoryName ? "border-red-500" : ""}
            />
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={isPending || isUpdating}
            disabled={isPending || isUpdating}
          >
            Submit
          </Button>
        </div>
        {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName.message}</p>}

      </div>

      <h4 className="mt-5">My Categories</h4>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {isLoadingCategories && <p>Loading...</p>}

        {categories && categories?.data?.map((category: TFinanceCategory, index: number) => (
          <div key={index} className="flex items-center gap-1 bg-primary/20 px-1">
            <div className="border-r border-black/40 pr-2">
              {category?.categoryName}
            </div>
            <div
              onClick={() => {
                setValue("categoryName", category?.categoryName || "");
                setIsEditing(true);
                setSelectedCategory(category);
              }}
              className="cursor-pointer border-primary"
            >
              <BiSolidEdit size={16} className="text-black" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryModal;