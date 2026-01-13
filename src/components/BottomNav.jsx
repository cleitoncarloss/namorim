/**
 * BottomNav - Navegação inferior da aplicação
 * Regra 010: Single Responsibility - apenas navegação
 * Regra 024: Constantes centralizadas
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';

const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Descobrir', emoji: '🔥' },
  { path: ROUTES.MESSAGES, label: 'Mensagens', emoji: '💬' },
  { path: ROUTES.MATCHES, label: 'Matches', emoji: '❤️' },
  { path: ROUTES.LIKES_YOU, label: 'Curtidas', emoji: '♥️' },
  { path: ROUTES.ACCOUNT, label: 'Perfil', emoji: '👤' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="nav-items">
        {NAV_ITEMS.map(({ path, label, emoji }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span>{emoji}</span>
            <span className="bottom-nav-label">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
