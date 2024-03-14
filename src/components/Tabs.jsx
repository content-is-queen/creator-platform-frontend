import clsx from "clsx";
import PropTypes from "prop-types";

const Tabs = ({ active, setActive, options }) => {
  return (
    <div className="flex gap-6">
      {options.map((option, index) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setActive(options[index]);
          }}
          className={clsx(
            "text-lg hover:text-current after:bg-current",
            option.id === active.id
              ? "relative after:absolute after:h-0.5 after:w-full after:left-0 after:bottom-0"
              : "opacity-60"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  active: PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  light: PropTypes.bool,
};
