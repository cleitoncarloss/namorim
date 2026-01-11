import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import Avatar from '../components/Avatar';

export default function Account({ session, setView }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatar_url, setAvatar_url] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, bio, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setBio(data.bio);
          setAvatar_url(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, newAvatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      bio,
      avatar_url: newAvatarUrl || avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      if (newAvatarUrl) setAvatar_url(newAvatarUrl);
      setEditing(false);
    }
    setLoading(false);
  }

  const getInitials = (name) => {
    if (!name) return 'TU';
    return name.substring(0, 2).toUpperCase();
  };

  if (editing) {
    return (
      <div className="account-container">
        <header className="app-header">
          <button className="back-btn" onClick={() => setEditing(false)}>
            ←
          </button>
          <h2>Editar Perfil</h2>
          <div style={{ width: 24 }}></div>
        </header>
        <div className="form-widget">
          <div className="account-header">
            <Avatar
              url={avatar_url}
              size={120}
              onUpload={(event, url) => {
                updateProfile(event, url);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Nome</label>
            <input
              id="username"
              type="text"
              required
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Como quer ser chamado(a)?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio || ''}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você..."
            />
          </div>

          <button
            className="button block primary"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Perfil'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {avatar_url ? (
            <Avatar url={avatar_url} size={100} />
          ) : (
            getInitials(username)
          )}
        </div>
        <h2>{username || 'Seu Nome'}</h2>
        <p>25 anos • São Paulo, SP</p>
      </div>

      <div className="profile-section">
        <h3>Bio</h3>
        <p>{bio || 'Amo viajar e conhecer lugares novos. Sempre em busca de novas aventuras!'}</p>
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

      <div style={{ padding: '24px' }}>
        <button
          className="button block primary"
          onClick={() => setEditing(true)}
        >
          Editar Perfil
        </button>
        <button
          className="button block"
          style={{ background: '#f5f5f5', color: '#333' }}
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
