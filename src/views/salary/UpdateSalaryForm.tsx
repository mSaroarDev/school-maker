import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

type UpdateSalaryFormProps = {
  selectedStatus: { value: string; label: string };
  setSelectedStatus: (status: { value: string; label: string }) => void;
};

const UpdateSalaryForm = ({
  selectedStatus,
  setSelectedStatus,
}: UpdateSalaryFormProps) => {

  const statusOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Due', label: 'Due' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Failed', label: 'Failed' },
    { value: 'Canceled', label: 'Canceled' },
    { value: 'Refunded', label: 'Refunded' },
    { value: 'Partial', label: 'Partial' },
    { value: 'Pushed', label: 'Pushed' },
  ];

  return (
    <>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Be aware to update the status.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>The amount will be marked as paid</li>
            <li>The amount will be add to the employee profile</li>
            <li>The amount will be adjusted from the balance</li>
            <li>Its not refundable</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-0.5 mt-4">
        {statusOptions.map((option, index) => (
          <div
            key={index}
            className={`px-3 py-2 border rounded-md cursor-pointer ${selectedStatus.value === option.value ? 'border-2 border-primary/30 bg-primary/10' : 'border-2 border-transparent bg-transparent'
              } flex items-center gap-2`}
            onClick={() => setSelectedStatus(option)}
          >
            {selectedStatus.value === option.value ? (
              <FaRegCircleCheck size={20} className="text-primary" />
            ) : (
              <FaRegCircle size={20} className="text-primary" />
            )}
            <span
              className={selectedStatus.value === option.value ? 'font-semibold text-primary mt-0.5' : 'mt-0.5'}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateSalaryForm;