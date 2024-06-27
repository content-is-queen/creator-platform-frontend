import clsx from "clsx";

const Bar = ({ dark }) => (
  <span
    className={clsx(
      "animate-pulse h-2 w-40 max-w-full rounded inline-block",
      dark ? "bg-queen-black" : "bg-queen-white"
    )}
  ></span>
);

const LoadingPlaceholder = ({ dark }) => (
  <span className="flex flex-col gap-2">
    <Bar dark={dark} />
    <Bar dark={dark} />
  </span>
);

export default LoadingPlaceholder;

LoadingPlaceholder.Bar = Bar;
