import Text from "@/components/Text";
import Dots from "@/components/Patterns/Dots";

const Panel = ({ title, children }) => (
  <aside className="relative bg-queen-blue text-queen-white overflow-hidden rounded-3xl p-8">
    {title && <Text size="xl">{title}</Text>}
    {children}
    <Dots className="text-queen-orange absolute -bottom-60 -right-36" />
  </aside>
);

export default Panel;
