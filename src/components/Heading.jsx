import clsx from "clsx";

const SIZES = {
  "2xl": "text-lg md:text-2xl",
  "3xl": "text-xl md:text-3xl",
  "4xl": "text-2xl md:text-4xl",
};
const COLORS = {
  black: "text-queen-black",
  white: "text-queen-white",
  lilac: "text-queen-lilac",
};
const Heading = ({
  tag = "p",
  size = "4xl",
  color = "black",
  className,
  children,
}) => {
  const Tag = tag;
  return (
    <Tag
      className={clsx(
        "uppercase font-heading",
        className,
        SIZES[size],
        COLORS[color],
        anton.className
      )}
    >
      {children}
    </Tag>
  );
};
export default Heading;