import React, { useState, useEffect, useCallback } from 'react';
import { Loader, SearchX } from 'lucide-react';
import { supabase } from '../services/supabase';
import ProfileCard from '../components/ProfileCard';
import MatchNotification from '../components/MatchNotification';

export default function Discovery({ session }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchedProfile, setMatchedProfile] = useState(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { user } = session;

    // Get IDs of users already liked or disliked by the current user
    const { data: likedData, error: likedError } = await supabase
      .from('likes')
      .select('liked_user_id')
      .eq('user_id', user.id);

    const { data: dislikedData, error: dislikedError } = await supabase
      .from('dislikes')
      .select('disliked_user_id')
      .eq('user_id', user.id);

    if (likedError || dislikedError) {
      setError(likedError?.message || dislikedError?.message);
      setLoading(false);
      return;
    }

    const seenUserIds = [
      ...likedData.map((l) => l.liked_user_id),
      ...dislikedData.map((d) => d.disliked_user_id),
    ];

    const allSeenIds = user.id ? [user.id, ...seenUserIds] : seenUserIds;

    // Fetch profiles that are not the current user and have not been seen
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .not('id', 'in', `(${allSeenIds.join(',')})`)
      .limit(10);

    if (profilesError) {
      setError(profilesError.message);
    } else {
      setProfiles(profilesData);
    }

    setLoading(false);
  }, [session]);

  const handleDismissMatch = () => {
    setMatchedProfile(null);
  };

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleSwipe = async (swipedUserId, action) => {
    const { user } = session;
    const table = action === 'like' ? 'likes' : 'dislikes';
    const column = action === 'like' ? 'liked_user_id' : 'disliked_user_id';

    const { error } = await supabase
      .from(table)
      .insert({ user_id: user.id, [column]: swipedUserId });

    if (error) {
      alert(`Erro ao registrar ${action}: ${error.message}`);
    } else {
      // If it was a like, check for a match
      if (action === 'like') {
        const { data, error: matchError } = await supabase
          .from('likes')
          .select('user_id')
          .eq('user_id', swipedUserId)
          .eq('liked_user_id', user.id);

        if (matchError) {
          console.error('Error checking for match:', matchError);
        } else if (data && data.length > 0) {
          // It's a Match!
          setMatchedProfile(currentProfile);
        }
      }

      // Remove the swiped profile from the list
      setProfiles((prevProfiles) =>
        prevProfiles.filter((p) => p.id !== swipedUserId)
      );
    }
  };

  if (loading) {
    return (
      <div className="discovery-container">
        <div className="empty-state">
          <Loader size={48} className="loading-spinner" />
          <p>Buscando perfis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discovery-container">
        <div className="empty-state">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="discovery-container">
        <div className="empty-state">
          <SearchX size={48} />
          <h3>Sem novos perfis</h3>
          <p>Volte mais tarde para descobrir novas pessoas!</p>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[0];

  return (
    <div className="discovery-container">
      <ProfileCard
        profile={currentProfile}
        onLike={() => handleSwipe(currentProfile.id, 'like')}
        onDislike={() => handleSwipe(currentProfile.id, 'dislike')}
      />
      <MatchNotification matchedProfile={matchedProfile} onDismiss={handleDismissMatch} />
    </div>
  );
}
