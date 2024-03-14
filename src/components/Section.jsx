import clsx from "clsx";
import Container from "./Container";

const Section = ({ children, className, size, ...otherProps }) => (
  <section className={clsx(className, "py-16")}>
    <Container size={size} {...otherProps}>
      {children}
    </Container>
  </section>
);

export default Section;
