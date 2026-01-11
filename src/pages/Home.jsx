import React from 'react';
import { Settings } from 'lucide-react';
import Discovery from './Discovery';

export default function Home({ session, setView }) {
  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>💕</h2>
        <div className="header-actions">
          <button onClick={() => setView({ name: 'account' })}>
            <Settings size={20} color="#667eea" />
          </button>
        </div>
      </header>
      <main>
        <Discovery session={session} />
      </main>
    </div>
  );
}
