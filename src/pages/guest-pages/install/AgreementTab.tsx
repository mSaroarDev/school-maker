import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdArrowBack, MdOutlineArrowForward, MdOutlineHandyman } from "react-icons/md";

type Props = {
  currStepId: number;
  setCurrStepId: React.Dispatch<React.SetStateAction<number>>;
};

export default function AgreementTab({
  currStepId,
  setCurrStepId,
}: Props) {
  const [agreed, setAgreed] = useState(false);

  const rules = [
    {
      id: "rule-1",
      text: "You will use this platform in compliance with all applicable laws and regulations.",
    },
    {
      id: "rule-2",
      text: "You will not share or upload content that is illegal, harmful, or infringes on others' rights.",
    },
    {
      id: "rule-3",
      text: "You are responsible for maintaining the confidentiality of your account credentials.",
    },
    {
      id: "rule-4",
      text: "We may update our terms from time to time. Continued use implies acceptance of the latest version.",
    },
    {
      id: "rule-5",
      text: "Data may be processed according to our Privacy Policy, including analytics and service improvement.",
    },
    {
      id: "rule-6",
      text: "Data may be processed according to our Privacy Policy, including analytics and service improvement.",
    },
    {
      id: "rule-7",
      text: "Data may be processed according to our Privacy Policy, including analytics and service improvement.",
    },
    {
      id: "rule-8",
      text: "Data may be processed according to our Privacy Policy, including analytics and service improvement.",
    },
  ];

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      return;
    }

    setCurrStepId(currStepId + 1);
  }

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <div className="backdrop-blur mt-5">
          <div className="mb-5 flex items-start gap-4 text-base font-semibold text-slate-900 dark:text-slate-200">
            <MdOutlineHandyman size={22} />
            <span>Terms and Agreements</span>
          </div>

          <div className="overflow-hidden">
            <div className="max-h-80 overflow-auto p-4 leading-relaxed text-slate-700 dark:text-slate-200">
              <ol className="list-decimal pl-5 space-y-3">
                {rules.map((r) => (
                  <li key={r.id} className="">
                    {r.text}
                  </li>
                ))}
              </ol>
              <hr className="my-4 border-slate-200 dark:border-slate-800" />
              <p className="text-sm">
                By checking the box, you agree to our {" "}
                <a href="#" className="underline hover:no-underline">Terms of Service</a>{" "}
                and {" "}
                <a href="#" className="underline hover:no-underline">Privacy Policy</a>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-10">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
              id="terms" 
            />
            <Label htmlFor="terms">
              I have read and agree to the terms and conditions. I understand that by checking this box, I am entering into a legally binding agreement.
            </Label>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <Button
            disabled={currStepId === 1}
          ><MdArrowBack size={18} />Previous</Button>
          <Button
            disabled={!agreed}
            onClick={handleContinue}
            className="bg-primary/90 hover:bg-primary text-white"
          >Next <MdOutlineArrowForward /></Button>
        </div>
      </motion.div>
    </div>
  );
}