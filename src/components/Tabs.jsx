import clsx from "clsx";

const Tabs = ({ active, setActive, options, light }) => {
  return (
    <div className="flex gap-6">
      {options.map((option, index) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setActive(options[index].id);
          }}
          className={clsx(
            "text-lg",
            light
              ? "text-queen-white hover:text-queen-white"
              : "text-queen-black hover:text-queen-black",
            { "after:bg-queen-black": !light && active },
            { "after:bg-queen-white": light && active },
            option.id === active
              ? "relative after:absolute after:h-0.5 after:w-full  after:left-0 after:bottom-0"
              : "text-opacity-60"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
