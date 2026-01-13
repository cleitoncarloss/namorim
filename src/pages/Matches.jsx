/**
 * Matches - Página de lista de matches
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatches } from '../hooks/useMatches';
import { usePublicAvatarUrl } from '../hooks/useAvatar';
import { useApp } from '../context/AppContext';
import { getFirstInitial } from '../domain/utils';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { PROFILE } from '../constants';

function MatchItem({ profile, onClick }) {
  const avatarUrl = usePublicAvatarUrl(profile.avatar_url);
  const initial = getFirstInitial(profile.username);

  return (
    <div className="match-item" onClick={onClick}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={profile.username} className="match-avatar" />
      ) : (
        <div className="match-avatar">{initial}</div>
      )}
      <div className="match-info">
        <h3>{profile.username}</h3>
        <p>{profile.bio || `${PROFILE.DEFAULT_LOCATION} • ${PROFILE.DEFAULT_AGE} anos`}</p>
      </div>
    </div>
  );
}

export default function Matches({ showMessages = false }) {
  const navigate = useNavigate();
  const { session } = useApp();
  const { matches, loading, error, refreshMatches } = useMatches(session);

  const openChat = (profile) => {
    navigate(`/chat/${profile.id}`);
  };

  const title = showMessages ? 'Mensagens' : 'Matches';

  if (loading) {
    return (
      <div className="matches-container">
        <header className="app-header">
          <h2>{title}</h2>
        </header>
        <main className="matches-list-container">
          <LoadingState message="Carregando matches..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-container">
        <header className="app-header">
          <h2>{title}</h2>
        </header>
        <main className="matches-list-container">
          <ErrorState message={error} onRetry={refreshMatches} />
        </main>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="matches-container">
        <header className="app-header">
          <h2>{title}</h2>
        </header>
        <main className="matches-list-container">
          <EmptyState
            icon="❤️"
            title="Nenhum match ainda"
            message="Continue deslizando para encontrar seu match perfeito!"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <header className="app-header">
        <h2>{title}</h2>
      </header>
      <main className="matches-list-container">
        {matches.map((profile) => (
          <MatchItem
            key={profile.id}
            profile={profile}
            onClick={() => openChat(profile)}
          />
        ))}
      </main>
    </div>
  );
}
