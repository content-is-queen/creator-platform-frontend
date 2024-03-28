import clsx from "clsx";
import PropTypes from "prop-types";

import Container from "./Container";

const THEMES = {
    orange: {
        classes: "bg-queen-orange text-white",
    },
};

const Section = ({ children, theme, className, size, ...otherProps }) => (
    <section className={clsx(className, THEMES[theme]?.classes, "py-16")}>
        <Container size={size} {...otherProps}>
            {children}
        </Container>
    </section>
);

export default Section;

Section.propTypes = {
    theme: PropTypes.oneOf(["orange"]),
    className: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(["md", "2xl", "4xl", "6xl"]),
};
