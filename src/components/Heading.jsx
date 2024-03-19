import clsx from "clsx";

const SIZES = {
  "3xl": "md:text-3xl",
  "4xl": "md:text-4xl",
};

const Heading = ({ tag = "p", size = "4xl", className, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={clsx(
        "uppercase text-queen-black font-heading text-lg",
        className,
        SIZES[size]
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
