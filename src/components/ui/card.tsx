type CardProps = {
  className?: string;
}

const Card = ({
  className = "",
}: CardProps) => {
  return (
    <>
      <div className={`bg-white dark:bg-card-background p-2 md:p-3 lg:p-4 shadow-md ${className}`}>
        Card
      </div>
    </>
  );
};

export default Card;