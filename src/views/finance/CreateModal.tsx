import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldArray, useForm } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { MdAdd } from "react-icons/md";

type CreateModalProps = {
  type: string;
}

const CreateModal = ({
  type
}: CreateModalProps) => {

  const defaultValues = {
    "type": type,
    "category": "64f7a1b3d4a5e6f789012346",
    "title": "Monthly Tuition Fee Collection",
    "paidBy": "64f7b2c4e5f6a7d890123456",
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
    "status": "pending",
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

  const onSubmit = (data: any) => {
    console.log("data", data);
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      <div>
        <Label>Title</Label>
        <Input
          {...register("title", { required: true })}
          placeholder="Enter title"
          defaultValue={defaultValues.title}
        />
      </div>

      <div>
        <Label>Category</Label>
        <Input
          {...register("category", { required: true })}
          placeholder="Enter category"
          defaultValue={defaultValues.category}
        />
      </div>

      <div>
        <Label>Transfered From</Label>
        <Input
          {...register("transferedFrom", { required: true })}
          placeholder="Enter transfered from"
          defaultValue={defaultValues.transferedFrom}
        />
      </div>

      <div>
        <Label>Transfered To</Label>
        <Input
          {...register("transferedTo", { required: true })}
          placeholder="Enter transfered to"
          defaultValue={defaultValues.transferedTo}
        />
      </div>

      <div>
        <Label>Remarks</Label>
        <Input
          {...register("remarks", { required: true })}
          placeholder="Enter remarks"
          defaultValue={defaultValues.remarks}
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
              />
              <div className="flex gap-2">
                <Input
                  defaultValue={item.amount}
                  placeholder="Amount"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => remove(index)}
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
        ><MdAdd size={18} />Add More</Button>
      </div>

      <div className="text-right mt-2">
        <Button>Add Transaction</Button>
      </div>


    </div>
  );
};

export default CreateModal;