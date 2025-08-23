import type { JSX } from "react";

interface IStep {
  stepId: number;
  stepName: string;
  desc: string;
  icon: JSX.Element;
};

interface IStepProgressProps {
  steps: IStep[];
  currStepId: number;
  className?: string;
  direction?: "row" | "col";
};

const StepProgress = ({ steps, currStepId, className, direction = "row" }: IStepProgressProps) => {

  return (
    <>
      <div className={`hidden md:flex ${direction === "col" ? "flex-col items-start" : "flex-row items-center"} flex-wrap gap-3 ${className}`}>
        {steps.map((step) => (
          <div
            key={step.stepId}
            className="flex items-center justify-start gap-3 mb-5"
          >
            <div
              className={`min-w-10 h-10 rounded-md ${currStepId === step.stepId
                ? "bg-primary"
                : "bg-gray-300 dark:bg-gray-600"
                } text-white flex items-center justify-center`}
            >
              {step.icon}
            </div>
            <div>
              <p
                className={`font-medium ${currStepId === step.stepId && "text-brand dark:text-gray-100"
                  }`}
              >
                {step.stepName}
              </p>
              <p
                className={`text-xs italic ${currStepId === step.stepId ? "text-brand dark:text-gray-100" : "text-gray-500"
                  }`}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StepProgress;