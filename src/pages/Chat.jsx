import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { supabase } from '../services/supabase';

export default function Chat({ session, setView, chatPartner }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const { user } = session;
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${chatPartner.id}),and(sender_id.eq.${chatPartner.id},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
      setLoading(false);
    }

    fetchMessages();
  }, [session, chatPartner]);

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${session.user.id}:${chatPartner.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          // Check if the new message belongs to this conversation
          if (
            (payload.new.sender_id === session.user.id && payload.new.receiver_id === chatPartner.id) ||
            (payload.new.sender_id === chatPartner.id && payload.new.receiver_id === session.user.id)
          ) {
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, chatPartner]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const { user } = session;
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: chatPartner.id,
        content: newMessage.trim(),
      });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <button className="button-back" onClick={() => setView({ name: 'matches' })}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-header-info">
          <h2>{chatPartner.username}</h2>
        </div>
      </header>
      <main className="chat-messages">
        {loading && <p>Carregando conversa...</p>}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender_id === session.user.id ? 'sent' : 'received'}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite uma mensagem..."
        />
        <button type="submit" className="button">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
