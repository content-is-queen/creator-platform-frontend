import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ButtonText from "@/components/ButtonText";
import Heading from "@/components/Heading";

const Credit = ({ href, role, name }) => {
  return (
    <div className="flex gap-x-4 relative">
      <span className="h-7 w-7 shrink-0 mt-1 bg-queen-black rounded-full block" />
      <div>
        <Heading
          color="lilac"
          as="a"
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          size="3xl"
          className={
            "after:absolute after:w-full after:h-full after:left-0 after:top-0 hover:text-queen-white transition"
          }
        >
          {name}
        </Heading>
        <span className="text-queen-white uppercase block">{role}</span>
      </div>
    </div>
  );
};

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>You haven't added any credits yet.</>;
  }

  return <>No credits</>;
};

const Credits = () => {
  const LIMIT = 3;
  const pathname = usePathname();

  const { user } = useUser();
  const credits = user?.credits ? JSON.parse(user.credits) : [];

  const [viewMore, setViewMore] = useState(false);
  const [viewableCredits, setViewableCredits] = useState([
    credits.slice(0, LIMIT),
  ]);

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
          <div className="space-y-6">
            {viewableCredits.map((credit) => (
              <Credit key={credit.href} {...credit} />
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
        <Empty />
      )}
    </>
  );
};

export default Credits;
