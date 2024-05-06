const LABELS = [
  { name: "proposals", label: "Proposals" },
  { name: "in_review", label: "In Review" },
  { name: "in_progress", label: "In Progress" },
  { name: "completed", label: "Completed" },
];

const Stat = ({ value, label }) => (
  <div className="bg-queen-white shadow-lg text-center rounded-full text-queen-black shrink-0 inline-flex w-1/2 pb-[50%] relative border-queen-blue border">
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
      <span className="font-heading text-3xl">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const StatsPanel = ({ applications }) => {
  const proposals = applications.length;
  const inProgress = applications.filter((i) => i.status === "accepted").length;
  const inReview = applications.filter((i) => i.status === "pending").length;

  const STATS = [
    { name: "proposals", value: proposals },
    { name: "in_review", value: inReview },
    { name: "in_progress", value: inProgress },
    { name: "completed", value: 0 },
  ];

  return (
    <div className="mx-auto w-72 flex items-center justify-center max-w-full">
      {STATS.map((stat) => (
        <Stat
          key={stat.name}
          label={LABELS.find((i) => i.name === stat.name).label}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatsPanel;
