import React from 'react';
import Avatar from './Avatar'; // Assuming Avatar component exists and is good

export default function MatchNotification({ matchedProfile, onDismiss }) {
  if (!matchedProfile) {
    return null;
  }

  return (
    <div className="match-overlay">
      <div className="match-modal">
        <h2>It's a Match!</h2>
        <p>You and {matchedProfile.username} have liked each other.</p>
        <div className="match-profiles">
          <Avatar url={matchedProfile.avatar_url} size={120} />
        </div>
        <button className="match-button" onClick={onDismiss}>Keep Swiping</button>
        {/* Optional: Add a button to go to chat */}
        {/* <button>Send a Message</button> */}
      </div>
      <style>{`
        .match-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .match-modal {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
          padding: 2.5rem 3rem;
          border-radius: 15px;
          text-align: center;
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: scale(0.9);
          animation: pop-in 0.3s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes pop-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .match-modal h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .match-modal p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        .match-profiles {
          margin: 2rem 0;
          display: flex;
          justify-content: center;
          gap: 20px; /* Space between potential multiple avatars */
        }
        .match-modal .avatar.image, .match-modal .avatar.no-image {
            border: 5px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            transition: transform 0.2s ease-in-out;
        }
        .match-modal .avatar.image:hover, .match-modal .avatar.no-image:hover {
            transform: scale(1.05);
        }
        .match-button {
            background-color: #ffffff;
            color: #ff6b6b;
            border: none;
            padding: 12px 25px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .match-button:hover {
            background-color: #ff6b6b;
            color: #ffffff;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
