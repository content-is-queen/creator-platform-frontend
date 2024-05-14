import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the cancel icon
import Section from './Section';
import Tabs from './Tabs';

const OPTIONS = [
  {
    label: 'Showcase',
    id: 'showcase',
    children: <>External</>,
  },
  {
    label: 'Credits',
    id: 'credits',
    theme: 'orange',
    children: <>A list of credits</>,
  },
  { label: 'Reviews', id: 'reviews', children: <>Reviews from brands</> },
];

const ProfileTabs = () => {
  const [active, setActive] = useState(OPTIONS[0]);
  const [episodeLink, setEpisodeLink] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setEpisodeLink(event.target.value);
  };

  const handleCancelInput = () => {
    setEpisodeLink('');
  };

  const handleEmbed = () => {
    if (episodeLink) {
      setLoading(true);
      setTimeout(() => {
        if (episodeLink.includes('open.spotify.com')) {
          const episodeId = episodeLink.split('/').pop();
          setEmbedCode(
            `<iframe src="https://open.spotify.com/embed/episode/${episodeId}" 
            width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
          );
        } else if (episodeLink.includes('podcasts.apple.com')) {
          const episodeId = episodeLink.split('?i=').pop();
          setEmbedCode(
            `<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/ronald-reagans-d-day-commemoration/id1527280716?i=${episodeId}"></iframe>`
          );
        } else if (episodeLink.includes('podomatic.com')) {
          const episodeId = episodeLink.split('/').pop();
          setEmbedCode(
            `<iframe src="https://podomatic.com/embed/html5/episode/${episodeId}" height="208" width="504" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowfullscreen></iframe>`
          );
        } else if (episodeLink.includes('podbean.com')) {
          const episodeId = episodeLink.split('/').pop();
          setEmbedCode(
            `<iframe title="Podbean Player" src="https://www.podbean.com/media/player/${episodeId}?from=embed&vjs=1&skin=1&share=1&fonts=Helvetica&auto=0&download=1&rtl=0" style="width: 100%; height: 100px;" scrolling="no" data-name="pb-iframe-player"></iframe>`
          );
        } else {
          console.log('Unsupported platform or invalid link');
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Section size="4xl" {...(active?.theme ? { theme: active.theme } : null)}>
      <Tabs options={OPTIONS} active={active} setActive={setActive} />
      <div className="py-14" >
        {active.id === 'showcase' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Enter podcast episode link"
                value={episodeLink}
                onChange={handleInputChange}
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  padding: '8px',
                  width: '100%',
                  fontSize: '15px',
                  maxWidth: '660px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
              {episodeLink && (
                <FaTimes
                  onClick={handleCancelInput}
                  style={{
                    marginLeft: '-25px',
                    cursor: 'pointer',
                    color: '#888',
                    fontSize: '15px'
                  }}
                />
              )}
              <button
                onClick={handleEmbed}
                style={{
                  marginLeft: '20px',
                  padding: '8px',
                  borderRadius: '5px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {loading ? 'Loading...' : 'Show'}
              </button>
            </div>
            {loading ? (
              <div style={{ marginTop: '10px' }}>Loading...</div>
            ) : (
              embedCode && <div   style={{ width: "100%", maxWidth: "660px", padding: "15px", borderRadius: "5px", marginTop: "20px", border: "1px solid #ccc" }}
              dangerouslySetInnerHTML={{ __html: embedCode }} />
            )}
          </>
        )}
        {active.id === 'credits' && <div>A list of credits</div>}
        {active.id === 'reviews' && <div>Reviews from brands</div>}
      </div>
    </Section>
  );
};

export default ProfileTabs;
