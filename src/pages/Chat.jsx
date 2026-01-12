/**
 * Chat - Página de chat
 * Regra 010: Single Responsibility Principle
 * Regra 002: Sem cláusula else (guard clauses)
 */

import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { ROUTES } from '../constants';

function ChatMessage({ message, isOwn }) {
  const className = `chat-bubble ${isOwn ? 'sent' : 'received'}`;
  return <div className={className}>{message.content}</div>;
}

export default function Chat({ session, setView, chatPartner }) {
  const [newMessage, setNewMessage] = useState('');
  const {
    messages,
    loading,
    sending,
    sendMessage,
    messagesEndRef,
  } = useChat(session, chatPartner);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    const { success } = await sendMessage(newMessage);

    if (success) {
      setNewMessage('');
    }
  };

  const handleBack = () => {
    setView({ name: ROUTES.MATCHES });
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <button className="button-back" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-header-info">
          <h2>{chatPartner?.username}</h2>
        </div>
      </header>

      <main className="chat-messages">
        {loading && <p>Carregando conversa...</p>}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.sender_id === session.user.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Digite uma mensagem..."
          disabled={sending}
        />
        <button type="submit" className="button primary" disabled={sending}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
