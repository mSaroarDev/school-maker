import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCircle } from "react-icons/md";

const TaskCard = ({ data, selectedColor }) => {


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
          <h3 className="text-xs line-clamp-2">{data?.taskName}</h3>
        </div>
        <div>
          {data.status === "completed" ? (
            <IoIosCheckmarkCircle className="text-green-500 cursor-pointer" size={22} />
          ) : (
            <MdOutlineCircle size={22} className="text-yellow-500 cursor-pointer" />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCard;