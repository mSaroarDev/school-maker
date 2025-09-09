import Spinner from "@/components/_core/Spinner";

const loading = () => {
    return (
        <>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Spinner />
          </div>
        </>
    );
};

export default loading;