type CardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Card = ({
  className = "",
  style = {},
  children,
}: CardProps) => {
  return (
    <>
      <div 
        style={style}
        className={`bg-white dark:bg-dark-card p-2 md:p-3 lg:p-4 shadow-md rounded-lg ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Card;