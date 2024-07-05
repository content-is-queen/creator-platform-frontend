import clsx from "clsx";

const Tag = ({ className, children }) => (
  <span
    className={clsx(
      "text-queen-black uppercase bg-queen-yellow font-medium rounded-full leading-none text-[10px] px-3 py-1",
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
