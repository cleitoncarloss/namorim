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

        // Get users who liked me
        const { data: likedMeData, error: likedMeError } = await supabase
          .from('likes')
          .select('user_id')
          .eq('liked_user_id', user.id);

        if (likedMeError) throw likedMeError;
        const likedMeIds = likedMeData.map((l) => l.user_id);

        // Get users I have already liked (to exclude matches)
        const { data: myLikesData, error: myLikesError } = await supabase
          .from('likes')
          .select('liked_user_id')
          .eq('user_id', user.id);

        if (myLikesError) throw myLikesError;
        const myLikedIds = myLikesData.map((l) => l.liked_user_id);
        
        // Filter out the users who are already matches
        const admirerIds = likedMeIds.filter(id => !myLikedIds.includes(id));

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
    // Optimistically remove the profile from the UI
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    
    // Create the like to form an instant match
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: session.user.id, liked_user_id: profileId });

    if (error) {
      alert("Could not create match: " + error.message);
      // TODO: Add the profile back to the UI on failure
    } else {
        alert("It's a Match! 💖 You can now chat with them from the Matches screen.");
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1>Who Liked You ✨</h1>
        <button className="button" onClick={() => setView({ name: 'home' })}>
          Back
        </button>
      </header>
      <main className="likes-you-grid">
        {loading && <p>Finding your admirers...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && profiles.length === 0 && <p>No new admirers right now. Check back later!</p>}
        {profiles.map(profile => (
          <div key={profile.id} className="admirer-card">
            <img
              src={
                profile.avatar_url
                  ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl
                  : 'https://via.placeholder.com/150'
              }
              alt={profile.username}
            />
            <h3>{profile.username}</h3>
            <button className="button" onClick={() => handleLikeBack(profile.id)}>
              Like Back
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
