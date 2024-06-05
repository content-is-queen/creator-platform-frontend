import clsx from "clsx";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-anton",
});

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
  as = "p",
  size = "4xl",
  color = "black",
  className,
  children,
  ...otherProps
}) => {
  const Tag = as;

  return (
    <Tag
      className={clsx(
        "uppercase font-heading",
        className,
        SIZES[size],
        COLORS[color],
        anton.className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Heading;
