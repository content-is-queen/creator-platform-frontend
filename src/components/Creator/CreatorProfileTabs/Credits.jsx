import ButtonText from "@/components/ButtonText";
import Heading from "@/components/Heading";
import { useEffect, useState } from "react";

const Credit = ({ show, role }) => (
  <div className="flex gap-x-4">
    <span className="h-8 w-8 mt-1 bg-queen-black rounded-full block" />
    <div>
      <Heading color="lilac" size="3xl">
        {show}
      </Heading>
      <p className="text-queen-white uppercase">{role}</p>
    </div>
  </div>
);

const Credits = () => {
  const LIMIT = 3;

  const [credits, setCredits] = useState([]); // TODO: Get value from API
  const [viewMore, setViewMore] = useState(false);
  const [viewableCredits, setViewableCredits] = useState(
    credits.slice(0, LIMIT)
  );

  const handleClick = () => {
    setViewMore(!viewMore);
  };

  useEffect(() => {
    viewMore
      ? setViewableCredits(credits)
      : setViewableCredits(credits.slice(0, LIMIT));
  }, [viewMore]);

  return (
    <>
      {credits.length > 0 ? (
        <>
          {" "}
          <div className="space-y-2">
            {viewableCredits.map((credit, index) => (
              <Credit key={`credit-${index}`} {...credit} />
            ))}
          </div>
          {credits.length > LIMIT && (
            <ButtonText
              type="button"
              as="button"
              onClick={handleClick}
              className="text-queen-yellow mt-8"
            >
              {viewMore ? "Show less" : "Show all"}
            </ButtonText>
          )}
        </>
      ) : (
        <>No credits found</>
      )}
    </>
  );
};

export default Credits;
