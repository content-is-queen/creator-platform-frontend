import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import GlobalSpinner from "./Spinner";

const ButtonVariants = cva(
  "inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 leading-none font-subheading tracking-wide rounded-full uppercase disabled:opacity-80 transition",
  {
    variants: {
      variant: {
        orange:
          "text-white bg-queen-orange font-bold focus-visible:outline-queen-orange hover:opacity-90",
        yellow:
          "text-queen-black bg-queen-yellow font-bold focus-visible:outline-queen-yellow hover:opacity-90",
        brown:
          "text-white bg-queen-black font-bold focus-visible:outline-queen-brown hover:opacity-90",
        blue: "text-white bg-queen-blue font-bold focus-visible:outline-queen-blue hover:opacity-90",
        white:
          "border border-queen-black/40 focus-visible:outline-queen-black hover:bg-queen-black/5",
      },
      size: {
        sm: "px-4 py-0.5 text-xs",
        md: "px-6 py-1.5 text-sm",
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
