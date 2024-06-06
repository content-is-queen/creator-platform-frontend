import clsx from "clsx";
import Container from "./Container";

const Block = ({ children, className, small, ...otherProps }) => (
  <section
    className={clsx("py-20", small ? "py-36" : "md:py-44", className)}
    {...otherProps}
  >
    <Container size="4xl">{children}</Container>
  </section>
);

export default Block;
