/**
 * Account - Página de perfil do usuário
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 * Regra 007: Componente pequeno
 * Regra 021: DRY - Usa hooks existentes
 */

import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAvatar } from '../hooks/useAvatar';
import { AuthService } from '../services/authService';
import LoadingState from '../components/ui/LoadingState';
import ProfileView from '../components/profile/ProfileView';
import EditProfileForm from '../components/profile/EditProfileForm';

export default function Account({ session }) {
  const [editing, setEditing] = useState(false);
  const { profile, loading, updateProfile } = useProfile(session);
  const { avatarUrl, uploadAvatar } = useAvatar(profile?.avatar_url);

  const handleSave = async (updates) => {
    if (updates.avatarFile) {
      const { success, path } = await uploadAvatar(updates.avatarFile);
      if (!success) {
        return;
      }
      updates = { ...updates, avatar_url: path };
      delete updates.avatarFile;
    }

    const { success } = await updateProfile(updates);
    if (success) {
      setEditing(false);
    }
  };

  const handleSignOut = () => {
    AuthService.signOut();
  };

  if (loading && !profile) {
    return <LoadingState message="Carregando perfil..." />;
  }

  if (editing) {
    return (
      <EditProfileForm
        profile={profile}
        avatarUrl={avatarUrl}
        onSave={handleSave}
        onCancel={() => setEditing(false)}
        loading={loading}
      />
    );
  }

  return (
    <ProfileView
      profile={profile}
      avatarUrl={avatarUrl}
      onEdit={() => setEditing(true)}
      onSignOut={handleSignOut}
    />
  );
}
