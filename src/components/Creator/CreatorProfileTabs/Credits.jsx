import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ButtonText from "@/components/ButtonText";
import Heading from "@/components/Heading";
import { db } from "@/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

const getEpisodeDetails = async (episodeId) => {
  const accessToken = await getAccessToken();

  const response = await axios.get(
    `https://api.spotify.com/v1/episodes/${episodeId}?market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const episodeData = response.data;
  const episodeName = episodeData.show.name; // Extracting only the show name
  const coverImage = episodeData.images[0].url; // Assuming the first image is the cover image
  console.log("Episode Name:", episodeName);
  console.log("Cover Image URL:", coverImage);
  return { ...episodeData, episodeName };
};

const Credit = ({ episode_link, role, episodeName }) => (
    <div className="flex gap-x-4">
      <span className="h-8 w-8 mt-1 bg-queen-black rounded-full block" />
      <div>
        <button className="hover:text-blue-500" onClick={() => {/* Add your onClick functionality */}}>
          <Heading color="lilac" size="3xl">
            {episodeName || episode_link}
          </Heading>
        </button>
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
  console.log("Credits:", credits);
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
      const updatedCredits = [...credits];

      for (let i = 0; i < credits.length; i++) {
        const credit = credits[i];
        if (!episodeNames[credit.episode_link]) {
          try {
            const episodeId = credit.episode_link
              .split("/episode/")[1]
              .split("?")[0];
            const episodeData = await getEpisodeDetails(episodeId);
            const episodeName = episodeData.episodeName; // Only show name
            const coverImage = episodeData.images[0].url; // Assuming the first image is the cover image

            // Update the credit object in the array
            updatedCredits[i] = { ...credit, episodeName, coverImage };

            // Store the updated credits array in Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
              "profile_meta.credits": updatedCredits,
            });

            names[credit.episode_link] = episodeName;
          } catch (error) {
            console.error("Error fetching episode details:", error);
            names[credit.episode_link] = credit.episode_link;
          }
        }
      }

      setEpisodeNames((prevNames) => ({ ...prevNames, ...names }));
    };

    fetchAllEpisodeNames();
  }, [credits, user.uid]);

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
