const Stat = ({ value, label }) => (
  <div className="bg-queen-white text-center rounded-full basis-1/2 text-queen-black inline-flex h-32 basis-32 flex-col justify-center items-center">
    <span className="font-heading text-3xl">{value}</span>
    <span className="text-sm">{label}</span>
  </div>
);

export default Stat;
