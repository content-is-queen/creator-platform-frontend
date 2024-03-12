import clsx from "clsx";

const SIZES = {
  lg: "max-w-2xl",
  default: "max-w-6xl",
};

const Container = ({ size = "default", className, children }) => (
  <div className={clsx(SIZES[size], "mx-auto px-8", className)}>{children}</div>
);

export default Container;
