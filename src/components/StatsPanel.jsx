import plurise from "@/helpers/plurise";
import clsx from "clsx";

import Subheading from "./Subheading";

const Stat = ({ value, label }) => (
  <div className="bg-queen-white shadow-lg text-center rounded-full text-queen-black shrink-0 inline-flex w-1/2 pb-[50%] relative border-queen-blue border">
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
      <Subheading size="3xl">{value}</Subheading>
      <span className="text-sm text-queen-black/80">{label}</span>
    </div>
  </div>
);

const StatsPanel = ({ applications, loading }) => {
  const proposals = applications.length;
  const inProgress = applications.filter((i) => i.status === "accepted").length;
  const inReview = applications.filter((i) => i.status === "pending").length;

  const STATS = [
    {
      name: "proposal",
      value: proposals,
      label: plurise("Proposal", proposals),
    },
    { name: "in_review", value: inReview, label: "In Review" },
    { name: "in_progress", value: inProgress, label: "In Progress" },
    { name: "completed", value: 0, label: "Completed" },
  ];

  return (
    <div
      className={clsx(
        "mx-auto w-72 flex items-center justify-center flex-wrap md:flex-nowrap",
        loading && "animate-pulse"
      )}
    >
      {STATS.map((stat) => {
        return <Stat key={stat.name} {...stat} />;
      })}
    </div>
  );
};

export default StatsPanel;
