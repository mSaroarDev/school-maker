import { useUpdateTask } from "@/api/tasks/tasks.hooks";
import { TTask } from "@/api/tasks/tasks.types";
import { useAuth } from "@/hooks/useAuth";
import { deleteTask, updateTask as editTask } from "@/redux/features/tasks/tasks.slice";
import { useAppDispatch } from "@/redux/hooks";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showConfirmModal } from "@/utils/showConfirmModal";
import { showToast } from "@/utils/showToast";
import { Trash2 } from "lucide-react";
import { CgSpinner } from "react-icons/cg";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCircle } from "react-icons/md";

type TaskCardProps = {
  data: TTask;
  selectedColor: {
    bg: string;
    border: string;
  } | null;
};

const TaskCard = ({ data, selectedColor }: TaskCardProps) => {
  const { isAdmin } = useAuth();

  const dispatch = useAppDispatch();
  const { mutateAsync: updateTask, isPending } = useUpdateTask();
  const handleStatusChange = (updatedData: Partial<TTask>) => {
    showConfirmModal({
      title: updatedData?.isDeleted ? "Delete Task?" : "Change Status?",
      text: updatedData?.isDeleted ? "Are you sure you want to delete this task?" : `Are you sure you want to Change the status of this task to "${updatedData.status}"?  `,
      func: async () => {
        try {
          const res = await updateTask({
            _id: data?._id as string,
            updatedData
          });

          if(res?.success) {
            console.log("action", updatedData.isDeleted)
            if(updatedData.isDeleted) {
              showToast("success", "Task deleted");
              dispatch(deleteTask(res.data?._id as string));
            } else {
              showToast("success", res?.message || "Task status updated successfully");
              dispatch(editTask(res.data));
            }
          }
        } catch (error) {
          showToast("error", handleErrorMessage(error) || "Failed to update task");
        }
      }
    })
  }

  return (
    <>
      <div
        style={{ backgroundColor: selectedColor?.bg, borderColor: selectedColor?.border }}
        className="bg-red-500/10 px-2 py-2 flex items-center justify-between rounded-sm mb-2 gap-5 hover:ml-1 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-[3px] rounded flex-shrink-0"
            style={{ backgroundColor: selectedColor?.border }}
          ></div>
          <div>
            <h3 className="text-sm line-clamp-2">{data?.taskName}</h3>
            <div className="flex items-center mt-1">
              <span className="text-[10px]">
                {data?.taskFor?.map(user => user?.fullName).join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isPending ? (
            <CgSpinner className="animate-spin text-slate-400" size={22} />
          ) : !isPending && data.status === "completed" ? (
            <IoIosCheckmarkCircle
              className="text-green-500 cursor-pointer" size={22}
              onClick={() => handleStatusChange({
                status: "pending"
              })}
            />
          ) : !isPending && (
            <MdOutlineCircle
              size={22}
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleStatusChange({
                status: "completed"
              })}
            />
          )}

          {isAdmin && (
            <button
              onClick={() => handleStatusChange({
                isDeleted: true
              })}
            >
              <Trash2 size={18} className="text-red-500 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;