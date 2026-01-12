/**
 * MatchNotification - Modal de notificação de match
 * Regra 010: Single Responsibility Principle
 * Regra 030: CSS em arquivo separado (movido para style.css)
 */

import React from 'react';
import Avatar from './Avatar';

export default function MatchNotification({ matchedProfile, onDismiss }) {
  if (!matchedProfile) {
    return null;
  }

  return (
    <div className="match-overlay">
      <div className="match-modal">
        <h2>It's a Match!</h2>
        <p>Você e {matchedProfile.username} curtiram um ao outro.</p>
        <div className="match-profiles">
          <Avatar url={matchedProfile.avatar_url} size={120} />
        </div>
        <button className="match-button" onClick={onDismiss}>
          Continuar
        </button>
      </div>
    </div>
  );
}
