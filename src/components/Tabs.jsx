import clsx from "clsx";

const Tabs = ({ active, setActive, options }) => {
  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setActive(options[index].id);
          }}
          className={clsx(
            "text-xl hover:text-queen-black",
            option.id === active
              ? "text-queen-black relative after:absolute after:h-0.5 after:w-full after:bg-queen-black after:left-0 after:bottom-0"
              : "text-queen-black/60"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
