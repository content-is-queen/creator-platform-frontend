import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const ButtonVariants = cva(
  "inline-flex items-center leading-none font-subheading rounded-full uppercase hover:opacity-90 disabled:opacity-60 transition",
  {
    variants: {
      variant: {
        orange: "text-white bg-queen-orange font-bold",
        yellow: "text-queen-black bg-queen-yellow font-bold",
        brown: "text-white bg-queen-brown font-bold",
        blue: "text-white bg-queen-blue font-bold",
        white: "border border-queen-black/40 hover:bg-gray-50",
      },
      size: {
        sm: "px-4 py-0.5 text-xs",
        md: "px-6 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "orange",
      size: "md",
    },
  }
);

const Spinner = () => (
  <svg
    class="animate-spin -ml-1 mr-3 h-3 w-3 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
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
