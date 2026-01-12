/**
 * ProfileCard - Card de perfil para swipe
 * Regra 010: Single Responsibility Principle
 * Regra 021: Elimina duplicação
 */

import React from 'react';
import { useAvatar } from '../hooks/useAvatar';
import { PROFILE } from '../constants';

function ProfileImage({ avatarUrl, username }) {
  if (avatarUrl) {
    return (
      <img src={avatarUrl} alt={username} className="profile-card-image" />
    );
  }

  return (
    <div className="profile-card-no-image">👤</div>
  );
}

function SwipeActions({ onLike, onDislike }) {
  return (
    <div className="swipe-actions">
      <button className="swipe-btn dislike" onClick={onDislike} aria-label="Passar">
        ✕
      </button>
      <button className="swipe-btn like" onClick={onLike} aria-label="Curtir">
        ♥
      </button>
    </div>
  );
}

export default function ProfileCard({ profile, onLike, onDislike }) {
  const { avatarUrl } = useAvatar(profile.avatar_url);

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-image-container">
          <ProfileImage avatarUrl={avatarUrl} username={profile.username} />
        </div>
        <div className="profile-card-info">
          <h2>{profile.username}, {PROFILE.DEFAULT_AGE}</h2>
          <p className="location">📍 {PROFILE.DEFAULT_LOCATION}</p>
          <p>{profile.bio}</p>
        </div>
      </div>
      <SwipeActions onLike={onLike} onDislike={onDislike} />
    </>
  );
}
