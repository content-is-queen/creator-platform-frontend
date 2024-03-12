import clsx from "clsx";

const SIZES = {
  md: "max-w-md",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
};

const Container = ({ size = "6xl", className, children }) => (
  <div className={clsx(SIZES[size], "mx-auto px-8", className)}>{children}</div>
);

export default Container;
