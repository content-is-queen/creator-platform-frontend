import Card from "./Card";

const InfoCard = ({ title, value }) => {
  return (
    <Card className="flex flex-col justify-between">
      <dd className="text-queen-black/80 pb-2 text-xl">{title}</dd>
      <dt className="text-3xl font-subheading font-bold">{value}</dt>
    </Card>
  );
};

export default InfoCard;
