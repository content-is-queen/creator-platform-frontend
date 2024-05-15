import clsx from "clsx";

const SIZES = {
  "2xl": "text-lg md:text-2xl",
  "3xl": "text-xl md:text-3xl",
  "4xl": "text-2xl md:text-4xl",
};

const Heading = ({ tag = "p", size = "4xl", className, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={clsx(
        "uppercase text-queen-black font-heading",
        className,
        SIZES[size]
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
