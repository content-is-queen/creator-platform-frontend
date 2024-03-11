import clsx from "clsx";

const Container = ({ className, children }) => (
  <div className={clsx("max-w-6xl mx-auto px-8", className)}>{children}</div>
);

export default Container;
