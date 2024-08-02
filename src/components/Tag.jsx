import clsx from "clsx";

const Tag = ({ className, children, color = "yellow" }) => {
  const COLORS = {
    yellow: "bg-queen-yellow-lighter text-queen-black",
    lilac: "bg-green-200 text-queen-black",
  };
  return (
    <span
      className={clsx(
        "uppercase  rounded-full leading-none text-xs px-3 py-1 text-[10px] flex-shrink-0",
        COLORS[color],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;
