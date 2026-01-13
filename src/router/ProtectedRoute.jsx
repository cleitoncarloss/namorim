/**
 * ProtectedRoute - Protege rotas que requerem autenticação
 * Regra 010: Single Responsibility - apenas proteção de rota
 * Regra 002: Guard clauses para redirecionamento
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingState from '../components/ui/LoadingState';
import { ROUTES } from '../constants';

export default function ProtectedRoute({ children }) {
  const { session, profile, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container">
        <LoadingState message="Iniciando..." />
      </div>
    );
  }

  if (!session) {
    return <Navigate to={ROUTES.AUTH_SIGN_IN} state={{ from: location }} replace />;
  }

  if (!profile) {
    return (
      <div className="container">
        <LoadingState message="Carregando perfil..." />
      </div>
    );
  }

  return children;
}
