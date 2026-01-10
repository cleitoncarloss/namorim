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
      alert('Error upgrading account: ' + error.message);
    } else {
      // Force a reload of the view to re-check premium status
      setView({ name: 'likes-you', force_reload: Date.now() });
    }
    setLoading(false);
  };

  return (
    <div>
      <header className="app-header">
        <h1>Namorim Gold</h1>
        <button className="button" onClick={() => setView({ name: 'home' })}>
          Back
        </button>
      </header>
      <main className="premium-upsell">
        <h2>See Who Likes You!</h2>
        <p>Upgrade to Namorim Gold to see everyone who has already liked your profile. It's the fastest way to match!</p>
        <div className="perk">✨ See all your admirers</div>
        <div className="perk">✨ Create instant matches</div>
        <button className="button primary block" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Upgrading...' : 'Upgrade to Gold for $9.99/mo'}
        </button>
      </main>
    </div>
  );
}
