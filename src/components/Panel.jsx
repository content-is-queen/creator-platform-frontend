import Text from "@/components/Text";
import clsx from "clsx";

const Panel = ({ title, className, children }) => (
  <div
    className={clsx(
      "relative bg-queen-blue text-queen-white overflow-hidden rounded-3xl p-8 bg-purple-dots-circle",
      className
    )}
  >
    {title && <Text size="xl">{title}</Text>}
    {children}
  </div>
);

export default Panel;
