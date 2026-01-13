/**
 * Home - Página principal de descoberta
 * Regra 010: Single Responsibility Principle
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Discovery from './Discovery';
import { useApp } from '../context/AppContext';
import { ROUTES } from '../constants';

export default function Home() {
  const { session } = useApp();

  return (
    <div className="page-wrapper">
      <header className="app-header">
        <h2>💕</h2>
        <div className="header-actions">
          <Link to={ROUTES.ACCOUNT}>
            <Settings size={20} color="#ec4899" />
          </Link>
        </div>
      </header>
      <main>
        <Discovery session={session} />
      </main>
    </div>
  );
}
