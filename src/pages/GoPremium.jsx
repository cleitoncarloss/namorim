import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function GoPremium({ session, setView }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const { user } = session;
    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: true })
      .eq('id', user.id);

    if (error) {
      alert('Erro ao fazer upgrade: ' + error.message);
    } else {
      setView({ name: 'likes-you', force_reload: Date.now() });
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>LoveConnect Gold</h2>
      </header>
      <main className="premium-upsell">
        <div className="premium-icon">
          👑
        </div>
        <h2>Desbloqueie o Gold</h2>
        <p className="description">
          Veja quem já curtiu seu perfil e crie matches instantâneos!
        </p>

        <div className="perk">
          👁️ <span>Veja todos seus admiradores</span>
        </div>
        <div className="perk">
          ⚡ <span>Matches instantâneos</span>
        </div>
        <div className="perk">
          ⭐ <span>Destaque seu perfil</span>
        </div>

        <button className="button gold block" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Processando...' : '👑 Assinar Gold - R$29,90/mês'}
        </button>
      </main>
    </div>
  );
}
