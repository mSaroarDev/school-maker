import { LuInbox } from "react-icons/lu";

const NoData = () => {
  return (
    <div className="h-24 flex flex-col items-center justify-center">
      <LuInbox size={30} className="text-red-500/40" />
      <h1 className="text-gray-500 font-medium text-lg mt-2">NoData</h1>
    </div>
  );
};

export default NoData;