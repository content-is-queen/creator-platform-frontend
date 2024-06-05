import Card from "./Card";

const InfoCard = ({ title, value }) => {
  return (
    <Card>
      <div className="flex flex-col justify-between p-4">
        <dd className="text-gray-500 pb-4">{title}</dd>
        <dt className="text-3xl font-extrabold">{value}</dt>
      </div>
    </Card>
  );
};

export default InfoCard;
