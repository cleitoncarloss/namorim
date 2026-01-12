/**
 * LikesYou - Página de quem curtiu você
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 */

import React from 'react';
import { useAdmirers } from '../hooks/useAdmirers';
import { usePublicAvatarUrl } from '../hooks/useAvatar';
import { ROUTES, PROFILE } from '../constants';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

function AdmirerCard({ profile, onLikeBack }) {
  const avatarUrl = usePublicAvatarUrl(profile.avatar_url);

  return (
    <div className="admirer-card" onClick={() => onLikeBack(profile.id)}>
      {avatarUrl && (
        <img src={avatarUrl} alt={profile.username} />
      )}
      <h3>{profile.username}, {PROFILE.DEFAULT_AGE}</h3>
    </div>
  );
}

export default function LikesYou({ session, setView }) {
  const { admirers, loading, error, likeBack, refreshAdmirers } = useAdmirers(session);

  const handleLikeBack = async (admirerId) => {
    const { success } = await likeBack(admirerId);

    if (success) {
      setView({ name: ROUTES.MATCHES });
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <header className="app-header">
          <h2>Curtidas</h2>
        </header>
        <main className="likes-you-grid">
          <div className="grid-full-width">
            <LoadingState message="Buscando admiradores..." />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <header className="app-header">
          <h2>Curtidas</h2>
        </header>
        <main className="likes-you-grid">
          <div className="grid-full-width">
            <ErrorState message={error} onRetry={refreshAdmirers} />
          </div>
        </main>
      </div>
    );
  }

  if (admirers.length === 0) {
    return (
      <div className="page-wrapper">
        <header className="app-header">
          <h2>Curtidas</h2>
        </header>
        <main className="likes-you-grid">
          <div className="grid-full-width">
            <EmptyState
              icon="♥️"
              title="Nenhum admirador ainda"
              message="Continue usando o app para atrair mais pessoas!"
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>Curtidas</h2>
      </header>
      <main className="likes-you-grid">
        {admirers.map((profile) => (
          <AdmirerCard
            key={profile.id}
            profile={profile}
            onLikeBack={handleLikeBack}
          />
        ))}
      </main>
    </div>
  );
}
