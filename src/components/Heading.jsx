import clsx from "clsx";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-anton",
});

const SIZES = {
  "2xl": "text-xl md:text-2xl",
  "3xl": "text-2xl md:text-3xl",
  "4xl": "text-3xl md:text-4xl",
  "5xl": "text-4xl md:text-5xl",
  "6xl": "text-5xl md:text-6xl",
};

const COLORS = {
  black: "text-queen-black",
  white: "text-queen-white",
  lilac: "text-queen-lilac",
  orange: "text-queen-orange",
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
