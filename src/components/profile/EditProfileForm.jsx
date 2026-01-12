/**
 * EditProfileForm - Formulário de edição de perfil
 * Regra 010: Single Responsibility - apenas edição de perfil
 * Regra 007: Componente pequeno
 */

import React, { useState } from 'react';
import Avatar from '../Avatar';

export default function EditProfileForm({ profile, avatarUrl, onSave, onCancel, loading }) {
  const [username, setUsername] = useState(profile?.username || '');
  const [bio, setBio] = useState(profile?.bio || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ username, bio });
  };

  const handleAvatarUpload = (event, url) => {
    onSave({ avatar_url: url });
  };

  return (
    <div className="account-container">
      <header className="app-header">
        <button className="back-btn" onClick={onCancel}>
          ←
        </button>
        <h2>Editar Perfil</h2>
        <div></div>
      </header>
      <div className="form-widget">
        <div className="account-header">
          <Avatar
            url={profile?.avatar_url}
            size={120}
            onUpload={handleAvatarUpload}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Como quer ser chamado(a)?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Conte um pouco sobre você..."
            />
          </div>

          <SubmitButton loading={loading} />
        </form>
      </div>
    </div>
  );
}

function SubmitButton({ loading }) {
  const buttonText = loading ? 'Salvando...' : 'Salvar Perfil';

  return (
    <button className="button block primary" type="submit" disabled={loading}>
      {buttonText}
    </button>
  );
}
