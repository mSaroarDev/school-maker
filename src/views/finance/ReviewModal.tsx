import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const ReviewModal = () => {

  const [selected, setSelected] = useState("");

  const handleSubmit = () => {
    console.log("selected", selected);
  }

  return (
    <>
      <div>
        <Label>Select Status</Label>
        <div className="mt-2 bg-primary/5 p-4 rounded">
          <RadioGroup 
            onValueChange={setSelected}
            defaultValue={selected}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Paid" id="r1" />
              <Label notRequired htmlFor="r1">Paid</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Unpaid" id="r2" />
              <Label notRequired htmlFor="r2">Unpaid</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Rejected" id="r3" />
              <Label notRequired htmlFor="r3">Rejected</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Pending" id="r4" />
              <Label notRequired htmlFor="r4">Pending</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Canceled" id="r5" />
              <Label notRequired htmlFor="r5">Canceled</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="text-right mt-5">
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;