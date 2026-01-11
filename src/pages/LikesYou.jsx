import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function LikesYou({ session, setView }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLikers() {
      try {
        setLoading(true);
        const { user } = session;

        const { data: likedMeData, error: likedMeError } = await supabase
          .from('likes')
          .select('user_id')
          .eq('liked_user_id', user.id);

        if (likedMeError) throw likedMeError;
        const likedMeIds = likedMeData.map((l) => l.user_id);

        const { data: myLikesData, error: myLikesError } = await supabase
          .from('likes')
          .select('liked_user_id')
          .eq('user_id', user.id);

        if (myLikesError) throw myLikesError;
        const myLikedIds = myLikesData.map((l) => l.liked_user_id);

        const admirerIds = likedMeIds.filter((id) => !myLikedIds.includes(id));

        if (admirerIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', admirerIds);

          if (profilesError) throw profilesError;
          setProfiles(profilesData);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLikers();
  }, [session]);

  const handleLikeBack = async (profileId) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));

    const { error } = await supabase
      .from('likes')
      .insert({ user_id: session.user.id, liked_user_id: profileId });

    if (error) {
      alert('Não foi possível criar o match: ' + error.message);
    } else {
      setView({ name: 'matches' });
    }
  };

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>Curtidas</h2>
      </header>
      <main className="likes-you-grid">
        {loading && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>Buscando admiradores...</p>
          </div>
        )}
        {error && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>Erro: {error}</p>
          </div>
        )}
        {!loading && profiles.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">♥️</div>
            <h3>Nenhum admirador ainda</h3>
            <p>Continue usando o app para atrair mais pessoas!</p>
          </div>
        )}
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="admirer-card"
            onClick={() => handleLikeBack(profile.id)}
          >
            {profile.avatar_url ? (
              <img
                src={supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl}
                alt={profile.username}
              />
            ) : null}
            <h3>{profile.username}, 25</h3>
          </div>
        ))}
      </main>
    </div>
  );
}
