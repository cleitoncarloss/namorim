import React from 'react';
import { Flame, MessageCircle, Heart, Star, User } from 'lucide-react';

const navItems = [
  { name: 'home', icon: Flame, label: 'Descobrir', emoji: '🔥' },
  { name: 'messages', icon: MessageCircle, label: 'Mensagens', emoji: '💬' },
  { name: 'matches', icon: Heart, label: 'Matches', emoji: '❤️' },
  { name: 'likes-you', icon: Star, label: 'Curtidas', emoji: '♥️' },
  { name: 'account', icon: User, label: 'Perfil', emoji: '👤' },
];

export default function BottomNav({ currentView, setView }) {
  return (
    <nav className="bottom-nav">
      <div className="nav-items">
        {navItems.map(({ name, label, emoji }) => {
          const isActive = currentView === name;
          return (
            <button
              key={name}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setView({ name })}
            >
              <span>{emoji}</span>
              <span className="bottom-nav-label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
