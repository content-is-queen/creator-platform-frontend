import React from 'react';
import { useUser } from "@/context/UserContext";

const Showcase = () => {
  // Using useUser hook to access user data
  const { user } = useUser();
  
  // Extracting showcase episodes from the user data
  const showcaseEpisodes = user?.showcase ?? [];

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Check if showcase episodes array is defined before mapping */}
        {showcaseEpisodes.map((episode, index) => {
          // Extracting episode ID for Apple Podcasts
          const appleId = episode.url.includes('apple') ? episode.url.split('?i=').pop() : null;

          return (
            <div key={index} style={{ width: '30%', marginBottom: '20px' }}>
              {/* Check if the episode URL is a Spotify URL */}
              {episode.url.includes('spotify') ? (
                <iframe
                  title={`Spotify Episode ${index + 1}`}
                  src={episode.url.replace('/episode/', '/embed/episode/')}
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  style={{ borderRadius: '12px' }}
                ></iframe>
              ) : episode.url.includes('apple') ? (
                <iframe
                  title={`Apple Podcasts Episode ${index + 1}`}
                  src={`https://embed.podcasts.apple.com/us/podcast/id1527280716?i=${appleId}`}
                  width="100%"
                  height="175"
                  frameBorder="0"
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                ></iframe>
              ) : (
                // Add conditions for other platforms if needed
                <p>Unsupported episode platform</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Showcase;
