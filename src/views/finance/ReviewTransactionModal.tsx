import { useUpdateTransaction } from "@/api/finance/finance.hooks";
import { TTransactions } from "@/api/finance/finance.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

type ReviewTransactionModalProps = {
  selectedTransaction: TTransactions | null;
  setShowReviewModal: (value: boolean) => void;
}

const ReviewTransactionModal = ({selectedTransaction, setShowReviewModal}: ReviewTransactionModalProps) => {

  const [selectedStatus, setSelectedStatus] = useState<string>("due");

  const {mutateAsync: updateTransaction, isPending} = useUpdateTransaction();

  const handleSubmit = () => {
    showConfirmModal({
      title: "Confirm Update?",
      text: "Are you sure you want to update the transaction status?",
      func: async () => {
        try {
          const res = await updateTransaction({
            _id: selectedTransaction?._id || "", 
            data: { status: selectedStatus}
          });

          if(res?.success) {
            showToast("success", res?.message || "Transaction status updated successfully");
            setShowReviewModal(false);
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error) || "Failed to update transaction status");
        }
      }
    })
  };

  return (
    <>
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Be aware to do this.</AlertTitle>
          <AlertDescription>
            <p>Changing any action will not reversible!</p>
          </AlertDescription>
        </Alert>

        <div className="mt-5 border border-gray-300 p-5 rounded-md">
          <h4 className="font-medium mb-4">Review and update payment status</h4>
          <RadioGroup 
            defaultValue={selectedTransaction?.status || "due"} 
            className="gap-2"
            onValueChange={(value) => setSelectedStatus(value)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="due" id="r1" />
              <Label notRequired htmlFor="r1">Due</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="overdue" id="r2" />
              <Label notRequired htmlFor="r2">Over Due</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="completed" id="r3" />
              <Label notRequired htmlFor="r3">Paid / Completed</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="pending" id="r4" />
              <Label notRequired htmlFor="r4">Pending</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="rejected" id="r5" />
              <Label notRequired htmlFor="r5">Rejected</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="canceled" id="r6" />
              <Label notRequired htmlFor="r6">Canceled</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-5 flex justify-end">
          <Button isLoading={isPending} onClick={handleSubmit}>Confirm and Update</Button>
        </div>
      </div>
    </>
  );
};

export default ReviewTransactionModal;