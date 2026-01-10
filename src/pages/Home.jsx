import React from 'react';
import Discovery from './Discovery';

export default function Home({ session, setView }) {
  return (
    <div>
      <header className="app-header">
        <h1>Namorim</h1>
        <div className="nav-buttons">
          <button className="button" onClick={() => setView({ name: 'matches' })}>
            My Matches
          </button>
          <button className="button gold" onClick={() => setView({ name: 'likes-you' })}>
            ✨ Who Likes You
          </button>
          <button className="button" onClick={() => setView({ name: 'account' })}>
            My Profile
          </button>
        </div>
      </header>
      <main>
        <Discovery session={session} />
      </main>
    </div>
  );
}
