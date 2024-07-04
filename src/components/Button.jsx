import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import GlobalSpinner from "./Spinner";

const ButtonVariants = cva(
  "inline-flex items-center leading-none font-subheading tracking-wide rounded-full uppercase disabled:opacity-80 transition",
  {
    variants: {
      variant: {
        orange:
          "text-white bg-queen-orange hover:bg-queen-orange-dark font-bold",
        yellow:
          "text-queen-black bg-queen-yellow hover:bg-queen-yellow-dark font-bold",
        brown: "text-white bg-queen-black font-bold",
        blue: "text-white bg-queen-blue font-bold",
        white: "border border-queen-black/40 hover:bg-queen-black/5",
      },
      size: {
        sm: "px-4 py-0.5 text-xs",
        md: "px-6 py-1 text-sm",
        lg: "px-8 py-2.5",
      },
    },
    defaultVariants: {
      variant: "orange",
      size: "md",
    },
  }
);

const Spinner = ({ dark }) => (
  <GlobalSpinner className="text-white mr-3 h-3 w-3" />
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

Button.Spinner = Spinner;
