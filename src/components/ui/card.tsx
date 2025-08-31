type CardProps = {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({
  className = "",
  children
}: CardProps) => {
  return (
    <>
      <div className={`bg-white dark:bg-dark-card p-2 md:p-3 lg:p-4 shadow-md rounded-lg ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Card;