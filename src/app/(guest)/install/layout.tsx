type Props = {
  children: React.ReactNode;
};

const layout = ({
  children,
}: Props) => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        {children}
      </div>
    </>
  );
};

export default layout;