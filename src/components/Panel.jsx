import Text from "@/components/Text";
import clsx from "clsx";

const Panel = ({ title, className, children }) => (
  <div
    className={clsx(
      "relative overflow-hidden rounded-3xl pl-10 pt-10 pr-10 pb-6 bg-no-repeat bg-right-bottom leading-none",
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
