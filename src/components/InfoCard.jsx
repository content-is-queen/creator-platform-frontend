import Card from "./Card";
import Subheading from "./Subheading";

const InfoCard = ({ title, children }) => {
  return (
    <Card className="flex flex-col justify-between">
      <dd className="text-queen-black/80 pb-2">{title}</dd>
      <Subheading as="dt" size="4xl">
        {children}
      </Subheading>
    </Card>
  );
};

export default InfoCard;
