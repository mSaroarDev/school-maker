import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "../ui/button";

const BackButton = () => {
  const {back} = useRouter();

    return (
        <>
          <Button
            onClick={()=> back()}
            size="sm"
            variant="outline"
            className="hidden md:flex"
          >
            <IoMdArrowBack size={18} />
            Back
          </Button>
        </>
    );
};

export default BackButton;