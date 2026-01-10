import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function ProfileCard({ profile, onLike, onDislike }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function downloadImage(path) {
      if (!path) return;
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) throw error;
        setAvatarUrl(URL.createObjectURL(data));
      } catch (error) {
        console.log('Error downloading image: ', error.message);
      }
    }

    downloadImage(profile.avatar_url);
  }, [profile.avatar_url]);

  return (
    <div className="profile-card">
      <div className="profile-card-image-container">
        {avatarUrl ? (
          <img src={avatarUrl} alt={profile.username} className="profile-card-image" />
        ) : (
          <div className="profile-card-no-image">No Image</div>
        )}
      </div>
      <div className="profile-card-info">
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>
      <div className="profile-card-actions">
        <button className="button dislike-button" onClick={onDislike}>
          ❌
        </button>
        <button className="button like-button" onClick={onLike}>
          ❤️
        </button>
      </div>
    </div>
  );
}
