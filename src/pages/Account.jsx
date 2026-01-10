import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import Avatar from '../components/Avatar';

export default function Account({ session, setView }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatar_url, setAvatar_url] = useState(null);

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
    }
    setLoading(false);
  }

  return (
    <div>
      <header className="app-header">
        <h1>My Profile</h1>
        <button className="button" onClick={() => setView({ name: 'home' })}>
          Back to Home
        </button>
      </header>
      <div className="form-widget">
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(event, url) => {
            updateProfile(event, url)
          }}
        />
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="text"
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button block primary"
            onClick={updateProfile}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update Profile'}
          </button>
        </div>

        <div>
          <button className="button block" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
