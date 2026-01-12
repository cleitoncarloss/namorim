/**
 * App - Componente principal da aplicação
 * Regra 010: Single Responsibility Principle
 * Regra 011: Open/Closed Principle (view renderers)
 * Regra 002: Sem cláusula else (guard clauses)
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import LikesYou from './pages/LikesYou';
import GoPremium from './pages/GoPremium';
import BottomNav from './components/BottomNav';
import LoadingState from './components/ui/LoadingState';
import { ROUTES } from './constants';

const VIEW_RENDERERS = {
  [ROUTES.HOME]: ({ session, setView }) => <Home session={session} setView={setView} />,
  [ROUTES.ACCOUNT]: ({ session, setView }) => <Account session={session} setView={setView} />,
  [ROUTES.MESSAGES]: ({ session, setView }) => <Matches session={session} setView={setView} showMessages={true} />,
  [ROUTES.MATCHES]: ({ session, setView }) => <Matches session={session} setView={setView} />,
  [ROUTES.CHAT]: ({ session, setView, view }) => <Chat session={session} setView={setView} chatPartner={view.partner} />,
  [ROUTES.LIKES_YOU]: ({ session, setView, profile }) => {
    if (profile?.is_premium) {
      return <LikesYou session={session} setView={setView} />;
    }
    return <GoPremium session={session} setView={setView} />;
  },
};

function AppContent() {
  const { session, profile, view, setView, loading } = useApp();

  if (loading) {
    return (
      <div className="container">
        <LoadingState message="Iniciando..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container">
        <Auth />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container">
        <LoadingState message="Carregando perfil..." />
      </div>
    );
  }

  const hideBottomNav = view.name === ROUTES.CHAT;
  const renderView = VIEW_RENDERERS[view.name] || VIEW_RENDERERS[ROUTES.HOME];

  return (
    <div className="container">
      {renderView({ session, setView, view, profile })}
      {!hideBottomNav && (
        <BottomNav currentView={view.name} setView={setView} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
