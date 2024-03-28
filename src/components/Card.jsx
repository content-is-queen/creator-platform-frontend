import clsx from "clsx";

const Card = ({ className, children }) => (
    <div className={clsx("shadow rounded-3xl p-10 bg-white", className)}>
        {children}
    </div>
);

export default Card;
