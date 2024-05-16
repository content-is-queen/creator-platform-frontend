import clsx from "clsx";

const Bar = ({ dark }) => (
  <div
    className={clsx(
      "animate-pulse h-2 w-40 rounded",
      dark ? "bg-queen-black" : "bg-queen-white"
    )}
  ></div>
);

const LoadingText = ({ dark }) => (
  <div className="flex flex-col gap-2">
    <Bar dark={dark} />
    <Bar dark={dark} />
  </div>
);

export default LoadingText;
