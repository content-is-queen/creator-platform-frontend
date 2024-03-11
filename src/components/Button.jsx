import { cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";

const ButtonVariants = cva(
  "inline-block font-medium rounded-full text-sm uppercase hover:opacity-90 transition",
  {
    variants: {
      variant: {
        orange: "text-white bg-queen-orange px-6 py-1.5",
        yellow: "text-white bg-queen-yellow px-6 py-1.5",
        brown: "text-white bg-queen-brown px-6 py-1.5",
        blue: "text-white bg-queen-blue px-6 py-1.5",
        white: "border border-queen-black/40 px-6 py-1.5",
        text: "uppercase relative after:absolute after:-bottom-0.5 after:w-full after:h-0.5 after:bg-queen-black after:left-0",
      },
    },
    defaultVariants: {
      variant: "orange",
    },
  }
);

const Button = ({ variant, tag, children, className, ...otherProps }) => {
  const Tag = tag || Link;

  return (
    <Tag
      className={clsx(ButtonVariants({ variant }), className)}
      {...otherProps}
    >
      {children}
      {variant === "text" && <>&rarr;</>}
    </Tag>
  );
};

export default Button;
