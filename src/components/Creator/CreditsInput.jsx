import axios from "axios";

import { useEffect, useState } from "react";
import Form, { Error } from "../Form";
import Button from "../Button";
import { useUser } from "@/context/UserContext";

const CreditsInput = ({ setLocalUser, handleChange }) => {
  const [credits, setCredits] = useState([]);
  const [inputValue, setInputValue] = useState({ href: "", role: "" });
  const [errors, setError] = useState({});

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

    if (!inputValue.href.startsWith("https://open.spotify.com/episode/")) {
      // Make sure href is a valid
      setError({ message: "Please enter a valid Spotify episode url" });
      return;
    }

    if (
      inputValue.href.trim("").length === 0 ||
      inputValue.role.trim("").length === 0
    ) {
      // Check if both fields contain a value
      setError({ message: "Both fields must be filled in" });
      return;
    }

    const episodeId = inputValue.href.split("/episode/")[1].split("?")[0];

    const episodeDetails = await getEpisode(episodeId);

    setCredits((prev) => [...prev, { ...inputValue, ...episodeDetails }]);

    // Clear input when an entry is added
    setInputValue({ href: "", role: "" });
    handleChange();
  };

  const remove = (href) => {
    setError({});
    setCredits((prev) => prev.filter((i) => i.href !== href));
    handleChange();
  };

  useEffect(() => {
    if (user && user.credits) {
      setCredits(JSON.parse(user.credits));
    }
  }, [user]);

  useEffect(() => {
    setLocalUser((prev) => {
      return { ...prev, credits: credits };
    });
  }, [credits]);

  return (
    <div>
      <div>
        <p className="uppercase mb-4">Credits</p>
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
              <img
                src={cover.url}
                height={70}
                width={70}
                alt=""
                className="rounded"
              />
              <Button
                type="button"
                variant="white"
                as="button"
                onClick={() => {
                  remove(href);
                }}
              >
                Remove
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
            Episode Link
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
        <Button type="button" variant="white" as="button" onClick={add}>
          Add
        </Button>
      </div>

      {errors?.message && <Error>{errors.message}</Error>}
    </div>
  );
};
export default CreditsInput;
