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

        const { data: myLikesData, error: myLikesError } = await supabase
          .from('likes')
          .select('liked_user_id')
          .eq('user_id', user.id);

        if (myLikesError) throw myLikesError;
        const myLikedIds = myLikesData.map((l) => l.liked_user_id);

        const { data: likedMeData, error: likedMeError } = await supabase
          .from('likes')
          .select('user_id')
          .eq('liked_user_id', user.id);

        if (likedMeError) throw likedMeError;
        const likedMeIds = likedMeData.map((l) => l.user_id);

        const matchIds = myLikedIds.filter((id) => likedMeIds.includes(id));

        if (matchIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, bio')
            .in('id', matchIds);

          if (profilesError) throw profilesError;
          setMatches(profilesData);
        } else {
          setMatches([]);
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

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="matches-container">
      <header className="app-header">
        <h2>Matches</h2>
      </header>
      <main className="matches-list-container">
        {loading && (
          <div className="empty-state">
            <p>Carregando matches...</p>
          </div>
        )}
        {error && (
          <div className="empty-state">
            <p>Erro: {error}</p>
          </div>
        )}
        {!loading && matches.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <h3>Nenhum match ainda</h3>
            <p>Continue deslizando para encontrar seu match perfeito!</p>
          </div>
        )}
        {matches.map((profile) => (
          <div key={profile.id} className="match-item" onClick={() => openChat(profile)}>
            {profile.avatar_url ? (
              <img
                src={supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl}
                alt={profile.username}
                className="match-avatar"
              />
            ) : (
              <div className="match-avatar">
                {getInitial(profile.username)}
              </div>
            )}
            <div className="match-info">
              <h3>{profile.username}</h3>
              <p>{profile.bio || 'São Paulo, SP • 25 anos'}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
