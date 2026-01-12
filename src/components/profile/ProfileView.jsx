/**
 * ProfileView - Visualização do perfil do usuário
 * Regra 010: Single Responsibility - apenas renderiza perfil
 * Regra 007: Componente pequeno
 */

import React from 'react';
import { getInitials } from '../../domain/utils';
import { PROFILE } from '../../constants';

function ProfileAvatar({ avatarUrl, username }) {
  const initials = getInitials(username, 'TU');

  if (avatarUrl) {
    return <img src={avatarUrl} alt="Avatar" />;
  }

  return initials;
}

export default function ProfileView({ profile, avatarUrl, onEdit, onSignOut }) {
  return (
    <div className="account-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <ProfileAvatar avatarUrl={avatarUrl} username={profile?.username} />
        </div>
        <h2>{profile?.username || 'Seu Nome'}</h2>
        <p>{PROFILE.DEFAULT_AGE} anos • {PROFILE.DEFAULT_LOCATION}</p>
      </div>

      <div className="profile-section">
        <h3>Bio</h3>
        <p>{profile?.bio || 'Amo viajar e conhecer lugares novos. Sempre em busca de novas aventuras!'}</p>
      </div>

      <div className="profile-section">
        <h3>Buscando por</h3>
        <p>Relacionamento sério</p>
      </div>

      <div className="profile-section">
        <h3>Interessado em</h3>
        <p>Mulheres • 18-50 anos</p>
      </div>

      <div className="profile-section">
        <h3>Localização</h3>
        <p>Buscando em: São Paulo</p>
      </div>

      <div className="profile-section">
        <button className="button block primary" onClick={onEdit}>
          Editar Perfil
        </button>
        <button className="button block secondary" onClick={onSignOut}>
          Sair
        </button>
      </div>
    </div>
  );
}
