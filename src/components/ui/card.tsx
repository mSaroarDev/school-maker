import clsx from "clsx";

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
        className={clsx(
          "bg-white dark:bg-dark-card rounded-lg",
          !className.includes("p-") && "p-2 md:p-3 lg:p-4", // apply default only if no padding passed
          className
        )}      >
        {children}
      </div>
    </>
  );
};

export default Card;