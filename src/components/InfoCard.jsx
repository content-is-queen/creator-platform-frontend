import Card from "./Card";

const InfoCard = ({ title, value }) => {
  return (
    <Card className="flex flex-col justify-between">
      <dd className="text-queen-black/80 pb-2">{title}</dd>
      <dt className="text-4xl font-subheading font-bold">{value}</dt>
    </Card>
  );
};

export default InfoCard;
