import clsx from "clsx";

const Card = ({ className, children, small }) => (
  <div
    className={clsx(
      "shadow-md border border-queen-black/10 bg-white",
      className,
      small ? "p-4 rounded-xl" : "p-10 rounded-3xl"
    )}
  >
    {children}
  </div>
);

export default Card;
