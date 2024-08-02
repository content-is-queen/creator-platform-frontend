import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import GlobalSpinner from "./Spinner";

const ButtonVariants = cva(
  "inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 leading-none font-subheading tracking-wide rounded-full uppercase",
  {
    variants: {
      variant: {
        orange:
          "text-white bg-queen-orange font-bold focus-visible:outline-queen-orange hover:bg-queen-orange-dark",
        yellow:
          "text-queen-black bg-queen-yellow font-bold focus-visible:outline-queen-yellow hover:bg-queen-yellow-dark",
        brown:
          "text-white bg-queen-black font-bold focus-visible:outline-queen-brown hover:bg-queen-black-dark",
        blue: "text-white bg-queen-blue-dark font-bold focus-visible:outline-queen-blue-darker hover:bg-queen-blue-darker disabled:bg-queen-blue-light",
        danger:
          "text-white bg-red-500 font-bold focus-visible:outline-red-500 hover:bg-red-600",
        success:
          "text-white bg-green-500 font-bold focus-visible:outline-green-500 hover:bg-green-600",
        white:
          "border border-queen-black/40 focus-visible:outline-queen-black hover:bg-queen-white-dark",
      },
      size: {
        sm: "px-4 py-1 text-xs",
        md: "px-6 py-1.5 text-xs",
        lg: "px-7 py-2.5 text-sm",
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
