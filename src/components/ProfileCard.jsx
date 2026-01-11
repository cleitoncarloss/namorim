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
    <>
      <div className="profile-card">
        <div className="profile-card-image-container">
          {avatarUrl ? (
            <img src={avatarUrl} alt={profile.username} className="profile-card-image" />
          ) : (
            <div className="profile-card-no-image">
              👤
            </div>
          )}
        </div>
        <div className="profile-card-info">
          <h2>{profile.username}, 25</h2>
          <p className="location">📍 São Paulo, SP</p>
          <p>{profile.bio}</p>
        </div>
      </div>
      <div className="swipe-actions">
        <button className="swipe-btn dislike" onClick={onDislike} aria-label="Passar">
          ✕
        </button>
        <button className="swipe-btn like" onClick={onLike} aria-label="Curtir">
          ♥
        </button>
      </div>
    </>
  );
}
