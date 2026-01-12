/**
 * Discovery - Página de descoberta de perfis
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 */

import React from 'react';
import { SearchX } from 'lucide-react';
import { useDiscovery } from '../hooks/useDiscovery';
import ProfileCard from '../components/ProfileCard';
import MatchNotification from '../components/MatchNotification';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function Discovery({ session }) {
  const {
    currentProfile,
    loading,
    error,
    matchedProfile,
    handleLike,
    handleDislike,
    dismissMatch,
    refreshProfiles,
  } = useDiscovery(session);

  if (loading) {
    return (
      <div className="discovery-container">
        <LoadingState message="Buscando perfis..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="discovery-container">
        <ErrorState message={error} onRetry={refreshProfiles} />
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="discovery-container">
        <div className="empty-state">
          <SearchX size={48} />
          <h3>Sem novos perfis</h3>
          <p>Volte mais tarde para descobrir novas pessoas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="discovery-container">
      <ProfileCard
        profile={currentProfile}
        onLike={() => handleLike(currentProfile.id)}
        onDislike={() => handleDislike(currentProfile.id)}
      />
      <MatchNotification
        matchedProfile={matchedProfile}
        onDismiss={dismissMatch}
      />
    </div>
  );
}
