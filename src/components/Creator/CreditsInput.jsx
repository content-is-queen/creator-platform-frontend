import axios from "axios";

import { useEffect, useState } from "react";

import { useUser } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRemove, faPlus } from "@fortawesome/free-solid-svg-icons";

import Form, { Error } from "../Form";
import Button from "../Button";

const CreditsInput = ({ setFormData, handleChange }) => {
  const LIMIT = 6;
  const [credits, setCredits] = useState([]);
  const [showcase, setShowcase] = useState([]);
  const [inputValue, setInputValue] = useState({
    href: "",
    role: "",
  });
  const [error, setError] = useState({});

  const { user } = useUser();

  const getSpotifyAccessToken = async () => {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                ":" +
                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  };

  const getEpisode = async (id) => {
    const accessToken = await getSpotifyAccessToken();

    const {
      data: { name, images, audio_preview_url },
    } = await axios.get(`https://api.spotify.com/v1/episodes/${id}?market=GB`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { name, cover: images[0], audio_preview_url };
  };

  const add = async () => {
    setError({});

    // Make sure href is valid
    if (!inputValue.href.startsWith("https://open.spotify.com/episode/")) {
      setError({ message: "Please enter a valid Spotify episode url" });
      return;
    }

    // Check if episode has already been added
    if (credits.find((i) => i.href === inputValue.href)) {
      setError({ message: "This episode has already been added" });
      return;
    }

    // Check if both fields contain a value
    if (
      inputValue.href.trim("").length === 0 ||
      inputValue.role.trim("").length === 0
    ) {
      setError({ message: "Both fields must be filled in" });
      return;
    }

    const episodeId = inputValue.href.split("/episode/")[1].split("?")[0];

    const episodeDetails = await getEpisode(episodeId);

    setCredits((prev) => [...prev, { ...inputValue, ...episodeDetails }]);

    // Clear input when an entry is added
    setInputValue({ href: "", role: "", showcase: false });
    handleChange();
  };

  const remove = (href) => {
    setError({});
    setCredits((prev) => prev.filter((i) => i.href !== href));
    setShowcase((prev) => prev.filter((i) => i !== href));
    handleChange();
  };

  const showcaseToggle = (href) => {
    setError({});

    // Check to see if showcase is equal to the limit
    if (showcase.length === LIMIT) {
      setError({
        message: `You can only add up to ${LIMIT} episodes to your showcase`,
      });
      return;
    }

    const credit = credits.find((i) => i.href === href);

    setShowcase((prev) => {
      if (showcase.includes(href)) {
        return prev.filter((i) => i !== href);
      } else {
        return [...prev, credit.href];
      }
    });

    handleChange();
  };

  useEffect(() => {
    if (user && user.credits) {
      setCredits(JSON.parse(user.credits));
    }

    if (user && user.showcase) {
      setShowcase(JSON.parse(user.showcase));
    }
  }, [user]);

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, credits };
    });
  }, [credits]);

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, showcase };
    });
  }, [showcase]);

  return (
    <div>
      <div>
        <p className="uppercase">Credits</p>
        <p className="text-sm text-queen-black/80 mb-4">
          Add your spotify episode link. It should look something like this:
          https://open.spotify.com/episode/3645233. Add an entry to your
          showcase by selecting the star
        </p>
      </div>

      {credits.length > 0 &&
        credits.map(({ name, role, href, cover }, index) => (
          <div
            key={index}
            className="flex items-center border-b border-queen-black/10 gap-4 pb-5 my-5"
          >
            <div>
              <span className="w-full block max-w-sm truncate">{name}</span>
              <span className="font-bold text-sm">{role}</span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <div className="relative rounded overflow-hidden">
                <img src={cover.url} height={70} width={70} alt="" />
                <button
                  className="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 focus-visible:outline-queen-blue"
                  type="button"
                  onClick={() => showcaseToggle(href)}
                >
                  {showcase.includes(href) ? (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-queen-yellow h-6"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-queen-white h-6 "
                    />
                  )}
                </button>
              </div>
              <Button
                type="button"
                variant="white"
                as="button"
                className="p-2"
                onClick={() => {
                  remove(href);
                }}
              >
                <FontAwesomeIcon icon={faRemove} />
              </Button>
            </div>
          </div>
        ))}

      <div className="flex items-end gap-x-6">
        <div className="space-y-4 w-full">
          <Form.Input
            className="w-full"
            value={inputValue?.href}
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                ["href"]: e.target.value,
              }))
            }
            label="sm"
          >
            Spotify Episode Link
          </Form.Input>
          <Form.Input
            className="w-full"
            value={inputValue?.role}
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, ["role"]: e.target.value }))
            }
            label="sm"
          >
            Role
          </Form.Input>
        </div>
        <Button
          type="button"
          variant="white"
          className="p-2"
          as="button"
          onClick={add}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      {error?.message && <Error>{error.message}</Error>}
    </div>
  );
};
export default CreditsInput;
