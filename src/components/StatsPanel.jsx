import Panel from "@/components/Panel";

const STATS_LABEL = [
  { name: "proposals", label: "Proposals" },
  { name: "in_progress", label: "In Progress" },
  { name: "in_review", label: "In Review" },
  { name: "completed", label: "Completed" },
];

const STATS = [
  { name: "proposals", value: 0 },
  { name: "in_progress", value: 0 },
  { name: "in_review", value: 0 },
  { name: "completed", value: 0 },
];

const Stat = ({ value, label }) => (
  <div className="bg-queen-white text-center rounded-full text-queen-black inline-flex w-1/2 pb-[50%] relative border-queen-blue border">
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
      <span className="font-heading text-3xl">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  </div>
);

const StatsPanel = () => (
  <Panel title="Overview">
    {STATS.map((stat) => (
      <Stat
        key={stat.name}
        label={STATS_LABEL.find((i) => i.name === stat.name).label}
        value={stat.value}
      />
    ))}
  </Panel>
);

export default StatsPanel;
