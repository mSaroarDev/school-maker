import { TTransactions } from "@/api/finance/finance.types";
import { useGetFinanceCategories } from "@/api/financeCategory/financeCategory.hooks";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Modal } from "@/components/_core/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { LuSettings2 } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import CategoryModal from "./CategoryModal";
import { TFinanceCategory } from "@/api/financeCategory/financeCategory.types";

type CreateModalProps = {
  type: string;
}

const CreateModal = ({
  type
}: CreateModalProps) => {

  const defaultValues = {
    "type": type,
    "category": "",
    "title": "Monthly Tuition Fee Collection",
    "amounts": [
      {
        "title": "January Fee",
        "amount": 5000
      },
      {
        "title": "Library Fee",
        "amount": 1500
      }
    ],
    "transferedFrom": "Cash",
    "transferedTo": "Bank Account",
    "remarks": "Initial payment recorded"
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues
  });

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "amounts"
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const { data: categories, isPending: isLoadingCategories } = useGetFinanceCategories(type);

  const categoryOptions = categories?.data?.map((category: TFinanceCategory) => ({
    value: category._id,
    label: category.categoryName
  })) || [];

  const onSubmit = (data: TTransactions) => {
    console.log("data", data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2">
        <div>
          <Label>Title</Label>
          <Input
            {...register("title", { required: true })}
            placeholder="Enter title"
            defaultValue={defaultValues.title}
            className={errors.title && "border-red-500"}
          />
          {errors.title && <ErrorLabel msg="Title is required" />}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>Category</Label>
            <LuSettings2 className="cursor-pointer" size={18} onClick={() => setShowCategoryModal(true)} />
          </div>
          <SelectComponent
            control={control}
            name="category"
            options={categoryOptions}
            placeholder="Select Classes"
            className=""
            rules={{ required: "Select at least one class" }}
            isLoading={isLoadingCategories}
          />
        </div>

        <div>
          <Label>Transfered From</Label>
          <Input
            {...register("transferedFrom", { required: true })}
            placeholder="Enter transfered from"
            defaultValue={defaultValues.transferedFrom}
            className={errors.transferedFrom && "border-red-500"}
          />
          {errors.transferedFrom && <ErrorLabel msg="Transfered From is required" />}
        </div>

        <div>
          <Label>Transfered To</Label>
          <Input
            {...register("transferedTo", { required: true })}
            placeholder="Enter transfered to"
            defaultValue={defaultValues.transferedTo}
            className={errors.transferedTo && "border-red-500"}
          />
          {errors.transferedTo && <ErrorLabel msg="Transfered To is required" />}
        </div>

        <div>
          <Label>Remarks</Label>
          <Input
            {...register("remarks", { required: true })}
            placeholder="Enter remarks"
            defaultValue={defaultValues.remarks}
            className={errors.remarks && "border-red-500"}
          />
          {errors.remarks && <ErrorLabel msg="Remarks is required" />}
        </div>

        <div>
          <Label>Amounts</Label>
          <div>
            {fields.map((item, index) => (
              <div key={index} className="p-1 rounded grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  defaultValue={item.title}
                  placeholder="Title"
                  {...register(`amounts.${index}.title` as const, { required: true })}
                  className={errors.amounts?.[index]?.title && "border-red-500"}
                />

                <div className="flex gap-2">
                  <Input
                    defaultValue={item.amount}
                    placeholder="Amount"
                    type="number"
                    {...register(`amounts.${index}.amount` as const, {
                      required: true,
                      valueAsNumber: true,
                      min: 0
                    })}
                    className={errors.amounts?.[index]?.amount && "border-red-500"}
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(index)}
                    type="button"
                  >
                    <HiTrash size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => append({ title: "", amount: 0 })}
            type="button"
          >
            <MdAdd size={18} />Add More
          </Button>
        </div>

        <div className="text-right mt-2">
          <Button type="submit">
            {/* show total */}
            Add {" "}
            ({fields.length > 0 && (
              " $" + fields.reduce((acc, curr) => acc + (curr.amount || 0), 0)
            )})
          </Button>
        </div>
      </form>

      {showCategoryModal && (
        <Modal
          isOpen={showCategoryModal}
          toggle={() => setShowCategoryModal(false)}
          title="Category Settings"
          description="Manage your transaction categories"
          showSubmitButton={false}
          showFooter={false}
          sideClick={true}
          size="xl"
        >
          <CategoryModal
            type={type}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateModal;