import clsx from "clsx";
import Link from "next/link";

const ButtonText = ({ as, children, className, ...otherProps }) => {
  const Element = as || Link;

  return (
    <Element
      className={clsx(
        "inline-block uppercase relative after:absolute after:-bottom-0.5 after:w-full after:h-0.5 after:bg-current after:left-0",
        className
      )}
      {...otherProps}
    >
      {children} &rarr;
    </Element>
  );
};

export default ButtonText;
