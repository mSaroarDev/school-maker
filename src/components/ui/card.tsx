import clsx from "clsx";

type CardProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Card = ({
  className = "",
  style = {},
  children,
}: CardProps) => {
  // Check if any padding class is present in className
  const hasPadding =
    /\bp-\d+\b/.test(className) ||
    /\bpx-\d+\b/.test(className) ||
    /\bpy-\d+\b/.test(className);

  return (
    <div
      style={style}
      className={clsx(
        "bg-white dark:bg-dark-card rounded-lg overflow-hidden",
        !hasPadding && "p-2 md:p-3 lg:p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;