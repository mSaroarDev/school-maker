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
          "bg-white dark:bg-dark-card rounded-lg overflow-hidden",
          !className.includes("p-") || !className.includes("px-") || !className.includes("py-") && "p-2 md:p-3 lg:p-4",
          className
        )}      >
        {children}
      </div>
    </>
  );
};

export default Card;