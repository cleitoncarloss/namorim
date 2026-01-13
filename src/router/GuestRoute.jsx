/**
 * GuestRoute - Redireciona usuários autenticados para home
 * Regra 010: Single Responsibility - proteção de rota para guests
 * Regra 002: Guard clauses
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingState from '../components/ui/LoadingState';
import { ROUTES } from '../constants';

export default function GuestRoute({ children }) {
  const { session, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container">
        <LoadingState message="Iniciando..." />
      </div>
    );
  }

  if (session) {
    const from = location.state?.from?.pathname || ROUTES.HOME;
    return <Navigate to={from} replace />;
  }

  return children;
}
