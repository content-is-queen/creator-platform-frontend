import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const ButtonVariants = cva(
  "inline-block leading-none font-subheading rounded-full uppercase hover:opacity-90 transition",
  {
    variants: {
      variant: {
        orange: "text-white bg-queen-orange font-bold",
        yellow: "text-queen-black bg-queen-yellow font-bold",
        brown: "text-white bg-queen-brown font-bold",
        blue: "text-white bg-queen-blue font-bold",
        white: "border border-queen-black/40 hover:bg-gray-50",
        text: "uppercase relative after:absolute after:-bottom-0.5 after:w-full after:h-0.5 after:bg-queen-black after:left-0",
      },
      size: {
        sm: "px-4 py-0.5 text-xs",
        md: "px-6 py-1 text-sm",
        text: "",
      },
    },
    defaultVariants: {
      variant: "orange",
      size: "md",
    },
  }
);

const Button = ({ variant, size, as, children, className, ...otherProps }) => {
  const Element = as || Link;

  return (
    <Element
      className={clsx(twMerge(ButtonVariants({ variant, size }), className))}
      {...otherProps}
    >
      {children}
      {variant === "text" && <>&rarr;</>}
    </Element>
  );
};

export default Button;
