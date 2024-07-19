import { cva } from "class-variance-authority";
import clsx from "clsx";

const TextVariants = cva("leading-5", {
  variants: {
    size: {
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      base: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },

    color: { muted: "text-queen-black/60" },
  },
  defaultVariants: {
    size: "base",
  },
});

const Text = ({ as = "p", size, color, className, children }) => {
  const Tag = as;

  return (
    <Tag className={clsx(TextVariants({ size, color }), className)}>
      {children}
    </Tag>
  );
};

export default Text;
