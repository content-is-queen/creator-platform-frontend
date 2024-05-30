import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ButtonText from "@/components/ButtonText";
import Heading from "@/components/Heading";

const fetchEpisodeName = async (episode_link) => {
  try {
    const episodeId = episode_link.split("/episode/")[1].split("?")[0];
    const response = await axios.get(
      `https://api.spotify.com/v1/episodes/${episodeId}`,
      {
        headers: {
          Authorization: `Bearer BQB2202VIfMVk_J1PN8Drsf3XZvTvEmKF6VFINHJbWE97NFD_FexAWm4MHKcKP5e-gDZrCz_fg0AP3bfs6tdAUNkgYzUlg6IB8Q4vLo_i37h3_KJo4HrfRjdVeMXYCZiHhrxluEj1KCf_clUSAWoRltxO-ffZMx8U27vsmnhQuirYQOQODUzIBJmPkNKFPrazRmzKa3bobgFipb2yS4&`,
        },
      }
    );
    return response.data.name;
  } catch (error) {
    console.error("Error fetching episode name:", error);
    return episode_link; // fallback to the link if an error occurs
  }
};

const Credit = ({ episode_link, role, episodeName }) => (
  <div className="flex gap-x-4">
    <span className="h-8 w-8 mt-1 bg-queen-black rounded-full block" />
    <div>
      <Heading color="lilac" size="3xl">
        {episodeName || episode_link}
      </Heading>
      <p className="text-queen-white uppercase">{role}</p>
    </div>
  </div>
);

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>You haven't added any credits yet.</>;
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
  const [episodeNames, setEpisodeNames] = useState({});

  const handleClick = () => {
    setViewMore(!viewMore);
  };

  useEffect(() => {
    viewMore
      ? setViewableCredits(credits)
      : setViewableCredits(credits.slice(0, LIMIT));
  }, [viewMore]);

  useEffect(() => {
    const fetchAllEpisodeNames = async () => {
      const names = {};
      for (const credit of credits) {
        if (!episodeNames[credit.episode_link]) {
          const name = await fetchEpisodeName(credit.episode_link);
          names[credit.episode_link] = name;
        }
      }
      setEpisodeNames((prevNames) => ({ ...prevNames, ...names }));
    };

    fetchAllEpisodeNames();
  }, [credits]);

  return (
    <>
      {credits.length > 0 ? (
        <>
          <div className="space-y-2">
            {viewableCredits.map((credit) => (
              <Credit
                key={credit.episode_link}
                {...credit}
                episodeName={episodeNames[credit.episode_link]}
              />
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
      <button className="bg-queen-yellow text-queen-black flex gap-x-4 items-center justify-center h-12 w-12 p-4 rounded-full fixed right-10 bottom-10 shadow-xl">
        <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
      </button>
    </>
  );
};

export default Credits;
