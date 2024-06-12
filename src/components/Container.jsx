import clsx from "clsx";

const SIZES = {
  md: "max-w-md",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const Container = ({ size = "7xl", className, children }) => (
  <div className={clsx(SIZES[size], "mx-auto px-8", className)}>{children}</div>
);

export default Container;
