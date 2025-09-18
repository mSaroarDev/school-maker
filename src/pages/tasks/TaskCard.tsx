import { TTask } from "@/api/tasks/tasks.types";
import { useAuth } from "@/hooks/useAuth";
import { Trash2 } from "lucide-react";
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

  return (
    <>
      <div
        style={{ backgroundColor: selectedColor?.bg, borderColor: selectedColor?.border }}
        className="bg-red-500/10 px-2 py-2 flex items-center justify-between rounded-sm mb-2 gap-5 hover:ml-1 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-[3px] rounded flex-shrink-0"
            style={{ backgroundColor: selectedColor?.border }}
          ></div>
          <div>
            <h3 className="text-sm line-clamp-2">{data?.taskName}</h3>
            <div className="flex items-center mt-1">
              {data?.taskFor?.map((user, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: selectedColor?.border }}
                  className="text-xs px-1.5 py-0.5 rounded mx-0.5 text-white"
                >
                  {user?.fullName}
                </span>
              ))}

            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {data.status === "completed" ? (
            <IoIosCheckmarkCircle className="text-green-500 cursor-pointer" size={22} />
          ) : (
            <MdOutlineCircle size={22} className="text-yellow-500 cursor-pointer" />
          )}

          {isAdmin && (
            <button className="">
              <Trash2 size={18} className="text-red-500 cursor-pointer" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;