import { TTransactions } from "@/api/finance/finance.types";
import { useGetFinanceCategories } from "@/api/financeCategory/financeCategory.hooks";
import ErrorLabel from "@/components/_core/ErrorLabel";
import { Modal } from "@/components/_core/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { LuSettings2 } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import CategoryModal from "./CategoryModal";
import { TFinanceCategory } from "@/api/financeCategory/financeCategory.types";
import { useCreateTransaction } from "@/api/finance/finance.hooks";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import moment from "moment";
import { useGetAllStudents } from "@/api/students/students.hooks";
import { RiUserSearchLine } from "react-icons/ri";

type CreateDueModalProps = {
  type: string;
}

const CreateDueModal = () => {

  const defaultValues = {
    type: "due",
    category: "",
    title: "due fee",
    paymentMethod: "N/A",
    amounts: [
      {
        title: "",
        amount: 0
      }
    ],
    transferedFrom: "N/A",
    transferedTo: "N/A",
    remarks: "Due fee",
    status: "due",
    studentId: "",
    dueDate: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm({
    defaultValues
  });

  const amounts = useWatch({
    control,
    name: "amounts"
  })

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "amounts"
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const { data: categories, isPending: isLoadingCategories } = useGetFinanceCategories("due");
  const { mutateAsync: createTransaction, isPending: isCreatingTransaction } = useCreateTransaction();

  const [search, setSearch] = useState("");
  const { data: students, isPending } = useGetAllStudents(
    search
      ? { currPage: 1, limit: 10, search }
      : { enabled: false }
  );

  const categoryOptions = categories?.data?.map((category: TFinanceCategory) => ({
    value: category._id,
    label: category.categoryName
  })) || [];

  const onSubmit = (data: TTransactions) => {
    showConfirmModal({
      title: "Create Transaction",
      text: "Are you sure you want to create this transaction?",
      func: async () => {
        try {
          const res = await createTransaction(data);
          if (res?.success) {
            showToast("success", res?.message || "Transaction created successfully");
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error) || "Failed to create transaction");
        }
      }
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3"
      >

        <div>
          <div className="flex items-center justify-between">
            <Label>Enter Student ID</Label>
            <button type="button" className="cursor-pointer px-2 py-0.5 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary">
              <RiUserSearchLine size={18} /> Check Student
            </button>
          </div>
          <Input
            type="text"
            {...register("studentId", { required: true })}
            placeholder="Enter Student ID"
            defaultValue={defaultValues.studentId}
            className={errors.studentId && "border-red-500"}
          />
          {errors.studentId && <ErrorLabel msg="Student ID is required" />}
        </div>

        <div>
          <Label>Due Date</Label>
          <Flatpickr
            onChange={(selectedDates) => {
              const selectedDate = selectedDates[0];
              const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
              setValue("dueDate", formattedDate as unknown as string);
            }}
            className={`w-full px-3 py-2 border ${errors?.dueDate ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Select Date"
            options={{
              dateFormat: "d M, Y",
              enableTime: false,
              mode: "single",
              static: true,
            }}
            value={
              getValues("dueDate") ? new Date(getValues("dueDate")) : ""
            }
          />
          {errors.transferedFrom && <ErrorLabel msg="Transfered From is required" />}
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
          <Button
            isLoading={isCreatingTransaction}
            disabled={isCreatingTransaction}
            type="submit"
          >
            Create Due of {" "}
            ({amounts.length > 0 && (
              " $" + amounts.reduce((acc, curr) => acc + (curr.amount || 0), 0)
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
          <CategoryModal type={"due"} />
        </Modal>
      )}
    </>
  );
};

export default CreateDueModal;