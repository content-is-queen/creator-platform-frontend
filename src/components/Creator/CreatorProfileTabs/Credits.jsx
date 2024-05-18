import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

import ButtonText from "@/components/ButtonText";
import Heading from "@/components/Heading";

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

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>You haven't added any credits</>;
  }

  return <>No credits</>;
};

const Credits = () => {
  const LIMIT = 3;

  const { user } = useUser();

  const credits = user?.profile_meta?.credits || [];

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

  if (credits.length > 0) {
    return (
      <>
        <div className="space-y-2">
          {viewableCredits.map((credit) => (
            <Credit key={credit.id} {...credit} />
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
    );
  }

  return <Empty />;
};

export default Credits;
