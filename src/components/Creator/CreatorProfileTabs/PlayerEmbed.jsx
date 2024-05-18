// e.g https://open.spotify.com/episode/0Mj1CsFpMsKJ6kBZhX4cMn?si=3535343c030d4b12
const SpotifyEmbed = ({ url }) => {
  const episodeId = url.split("/")[4];

  return (
    <iframe
      src={`https://open.spotify.com/embed/episode/${episodeId}`}
      width="100%"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

// e.g. https://podcasts.apple.com/gb/podcast/podcast-friday-scottie-scheffler-incident-051724/id1444520159?i=1000655953743
const AppleEmbed = ({ url }) => {
  const podcastId = url.split("/")[5];
  const episodeId = url.split("/")[6];

  return (
    <iframe
      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      frameborder="0"
      height="175"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={`https://embed.podcasts.apple.com/gb/podcast/${podcastId}/${episodeId}`}
    />
  );
};

const PlayerEmbed = ({ url }) => {
  if (url.startsWith("https://podcasts.apple.com/gb/podcast/"))
    return <AppleEmbed url={url} />;

  if (url.startsWith("https://open.spotify.com/episode/"))
    return <SpotifyEmbed url={url} />;
};

export default PlayerEmbed;
