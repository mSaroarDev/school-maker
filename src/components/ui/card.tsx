type CardProps = {
  className?: string;
}

const Card = ({
  className = "",
}: CardProps) => {
  return (
    <>
      <div className={`bg-white dark:bg-dark-card p-2 md:p-3 lg:p-4 shadow-md rounded-lg ${className}`}>
        Card
      </div>
    </>
  );
};

export default Card;