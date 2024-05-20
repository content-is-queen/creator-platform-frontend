// e.g. https://podcasts.apple.com/us/podcast/it-was-said/id1527280716
// e.g. https://podcasts.apple.com/us/podcast/john-f-kennedy-we-choose-to-go-to-the-moon/id1527280716?i=1000580882015
const AppleEmbed = ({ url }) => {
  const parts = url.split("/");

  // The podcastId is the part after 'id'
  const podcastId = parts.find(part => part.startsWith('id'));

  // The episodeId is the query parameter `i` at the end of the URL
  const episodeId = new URL(url).searchParams.get('i');

  if (!podcastId || !episodeId) return null;

  return (
    <iframe
      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      frameBorder="0"
      height="175"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={`https://embed.podcasts.apple.com/us/podcast/${podcastId}?i=${episodeId}`}
    />
  );
};

const SpotifyEmbed = ({ url }) => {
  const episodeId = url.split("/")[4];

  return (
    <iframe
      src={`https://open.spotify.com/embed/episode/${episodeId}`}
      width="100%"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const PlayerEmbed = ({ url }) => {
  if (url.startsWith("https://podcasts.apple.com/"))
    return <AppleEmbed url={url} />;

  if (url.startsWith("https://open.spotify.com/episode/"))
    return <SpotifyEmbed url={url} />;
};

export default PlayerEmbed;
