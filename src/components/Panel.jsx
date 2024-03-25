import Text from "@/components/Text";
import clsx from "clsx";

const Panel = ({ title, className, children }) => (
  <div
    className={clsx(
      "relative bg-queen-blue text-queen-white overflow-hidden rounded-3xl px-10 pt-10 pb-16 bg-purple-dots-circle leading-none",
      className
    )}
  >
    {title && (
      <Text size="xl" className="mb-4">
        {title}
      </Text>
    )}
    {children}
  </div>
);

export default Panel;
