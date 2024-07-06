import clsx from "clsx";
import PropTypes from "prop-types";

const Tabs = ({ active, setActive, options }) => {
  return (
    <ul className="flex gap-5" role="tablist">
      {options.map((option, index) => {
        const isActive = option.id === active.id;

        return (
          <li key={option.id}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActive(options[index]);
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={option.id}
              className={clsx(
                "text-lg transition hover:text-current after:bg-current focus-visible:outline focus-visible:outline-queen-black focus-visible:outline-offset-2 focus-visible:outline-2",
                isActive
                  ? "relative after:absolute after:h-0.5 after:w-full after:left-0 after:bottom-0"
                  : "opacity-60 hover:opacity-40 "
              )}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;

Tabs.propTypes = {
  active: PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  light: PropTypes.bool,
};
