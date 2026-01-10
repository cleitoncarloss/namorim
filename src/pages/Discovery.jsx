import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import ProfileCard from '../components/ProfileCard';

export default function Discovery({ session }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      alert(`Error recording ${action}: ${error.message}`);
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
          alert("It's a Match! 💖");
          // In a real app, you'd create a chat room or a more robust notification
        }
      }

      // Remove the swiped profile from the list
      setProfiles((prevProfiles) =>
        prevProfiles.filter((p) => p.id !== swipedUserId)
      );
    }
  };

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (profiles.length === 0) {
    return <div>No new profiles to show. Check back later!</div>;
  }

  const currentProfile = profiles[0];

  return (
    <div className="discovery-container">
      <ProfileCard
        profile={currentProfile}
        onLike={() => handleSwipe(currentProfile.id, 'like')}
        onDislike={() => handleSwipe(currentProfile.id, 'dislike')}
      />
    </div>
  );
}
