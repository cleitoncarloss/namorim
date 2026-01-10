import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function Matches({ session, setView }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const { user } = session;

        // Find users that the current user has liked
        const { data: myLikesData, error: myLikesError } = await supabase
          .from('likes')
          .select('liked_user_id')
          .eq('user_id', user.id);

        if (myLikesError) throw myLikesError;
        const myLikedIds = myLikesData.map((l) => l.liked_user_id);

        // Find users who have liked the current user
        const { data: likedMeData, error: likedMeError } = await supabase
          .from('likes')
          .select('user_id')
          .eq('liked_user_id', user.id);

        if (likedMeError) throw likedMeError;
        const likedMeIds = likedMeData.map((l) => l.user_id);

        // Find the intersection (the matches)
        const matchIds = myLikedIds.filter((id) => likedMeIds.includes(id));

        if (matchIds.length > 0) {
          // Fetch the profiles of the matched users
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, bio')
            .in('id', matchIds);

          if (profilesError) throw profilesError;
          setMatches(profilesData);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [session]);

  const openChat = (profile) => {
    setView({ name: 'chat', partner: profile });
  };

  return (
    <div>
      <header className="app-header">
        <h1>My Matches</h1>
        <button className="button" onClick={() => setView({ name: 'home' })}>
          Back to Discovery
        </button>
      </header>
      <main className="matches-list-container">
        {loading && <p>Loading matches...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && matches.length === 0 && <p>No matches yet. Keep swiping!</p>}
        {matches.map((profile) => (
          <div key={profile.id} className="match-item" onClick={() => openChat(profile)}>
            <img
              src={
                profile.avatar_url
                  ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl
                  : 'https://via.placeholder.com/100'
              }
              alt={profile.username}
              className="match-avatar"
            />
            <div className="match-info">
              <h3>{profile.username}</h3>
              <p>{profile.bio}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

