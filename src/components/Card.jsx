import clsx from "clsx";

const Card = ({ className, children, small }) => (
  <div
    className={clsx(
      "shadow-md border border-queen-black/15 bg-white",
      className,
      small ? "p-2 lg:p-4 rounded-xl" : "p-8 lg:p-10 rounded-3xl"
    )}
  >
    {children}
  </div>
);

export default Card;
