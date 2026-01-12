/**
 * GoPremium - Página de upgrade para premium
 * Regra 010: Single Responsibility Principle
 */

import React, { useState } from 'react';
import { ProfileService } from '../services/profileService';
import { ROUTES } from '../constants';
import { ERROR_MESSAGES } from '../constants/errors';

const PREMIUM_PERKS = [
  { icon: '👁️', text: 'Veja todos seus admiradores' },
  { icon: '⚡', text: 'Matches instantâneos' },
  { icon: '⭐', text: 'Destaque seu perfil' },
];

export default function GoPremium({ session, setView }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpgrade = async () => {
    if (!session?.user?.id) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error: upgradeError } = await ProfileService.upgradeToPremium(session.user.id);

    if (upgradeError) {
      setError(upgradeError.message || ERROR_MESSAGES.GENERIC_ERROR);
      setLoading(false);
      return;
    }

    setView({ name: ROUTES.LIKES_YOU, force_reload: Date.now() });
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>LoveConnect Gold</h2>
      </header>
      <main className="premium-upsell">
        <div className="premium-icon">👑</div>
        <h2>Desbloqueie o Gold</h2>
        <p className="description">
          Veja quem já curtiu seu perfil e crie matches instantâneos!
        </p>

        {PREMIUM_PERKS.map((perk, index) => (
          <div key={index} className="perk">
            {perk.icon} <span>{perk.text}</span>
          </div>
        ))}

        {error && (
          <div className="auth-message error mt-4">
            {error}
          </div>
        )}

        <button
          className="button gold block"
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? 'Processando...' : '👑 Assinar Gold - R$29,90/mês'}
        </button>
      </main>
    </div>
  );
}
