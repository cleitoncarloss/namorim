/**
 * PremiumRoute - Redireciona usuários não-premium para página de upgrade
 * Regra 010: Single Responsibility - proteção de rota premium
 * Regra 002: Guard clauses
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ROUTES } from '../constants';

export default function PremiumRoute({ children }) {
  const { profile } = useApp();

  if (!profile?.is_premium) {
    return <Navigate to={ROUTES.PREMIUM} replace />;
  }

  return children;
}
