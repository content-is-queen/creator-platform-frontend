import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>Edit your profile to add your proudest credits to your showcase</>;
  }

  return <>No shows</>;
};

const Show = ({ href, audio_preview_url, role, name, cover }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef();

  const play = () => {
    audioRef.current.play();
    setAudioPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setAudioPlaying(false);
  };

  useEffect(() => {
    const handleEnded = () => {
      audioRef.current.currentTime = 0;
      setAudioPlaying(false);
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div key={href} className="space-y-5 relative group">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={cover.url || ""}
          alt={`${name} cover`}
          className="object-cover w-full transition group-hover:scale-105"
          height={200}
          width={200}
        />
        <img
          src="/images/spotify.svg"
          alt="Spotify"
          height={25}
          width={25}
          className="absolute right-4 bottom-4"
        />
        {audioPlaying ? (
          <button
            onClick={pause}
            className="absolute transform left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition hover:opacity-90"
          >
            <FontAwesomeIcon
              className="h-20 w-20 text-queen-white"
              icon={faPauseCircle}
            />
          </button>
        ) : (
          <button
            onClick={play}
            className="absolute transform left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 transition hover:opacity-90"
          >
            <FontAwesomeIcon
              className="h-20 w-20 text-queen-white"
              icon={faPlayCircle}
            />
          </button>
        )}
        <audio
          ref={audioRef}
          className="absolute left-4 bottom-4 max-w-48 hidden"
          controls
        >
          <source src={audio_preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div>
        <p
          href={href}
          className="truncate inline-block max-w-60 w-full leading-none "
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </p>
        <span className="text-queen-black/60 block text-sm leading-none">
          {role}
        </span>
      </div>
    </div>
  );
};

const Showcase = () => {
  const { user } = useUser();
  const creditsToShow = user?.showcase ? JSON.parse(user.showcase) : [];

  const credits = user?.credits ? JSON.parse(user.credits) : [];

  const showcase = credits.reduce((acc, current) => {
    if (creditsToShow.includes(current.name)) {
      return [...acc, current];
    }
    return [...acc];
  }, []);

  return (
    <div>
      {showcase.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {showcase.map((show) => (
            <Show key={show.href} {...show} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Showcase;
