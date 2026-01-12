/**
 * useChat - Hook para chat
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatService } from '../services/chatService';

const chatCache = new Map();

function getCacheKey(userId, partnerId) {
  return `${userId}-${partnerId}`;
}

export function useChat(session, chatPartner) {
  const userId = session?.user?.id;
  const partnerId = chatPartner?.id;
  const cacheKey = userId && partnerId ? getCacheKey(userId, partnerId) : null;
  const cachedMessages = cacheKey ? chatCache.get(cacheKey) : null;
  const hasCachedData = cachedMessages !== null && cachedMessages !== undefined;

  const [messages, setMessages] = useState(hasCachedData ? cachedMessages : []);
  const [loading, setLoading] = useState(!hasCachedData);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const isFirstLoad = useRef(!hasCachedData);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fetchMessages = useCallback(async (showLoading = false) => {
    if (!userId || !partnerId) {
      return;
    }

    if (showLoading || isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    const { messages: fetchedMessages, error: fetchError } =
      await ChatService.getMessages(userId, partnerId);

    if (fetchError) {
      setError(fetchError.message);
    }

    if (!fetchError) {
      setMessages(fetchedMessages);
      chatCache.set(getCacheKey(userId, partnerId), fetchedMessages);
    }

    setLoading(false);
    isFirstLoad.current = false;
  }, [userId, partnerId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!userId || !partnerId) {
      return;
    }

    const unsubscribe = ChatService.subscribeToMessages(
      userId,
      partnerId,
      (newMessage) => {
        setMessages(prev => {
          const updated = [...prev, newMessage];
          chatCache.set(getCacheKey(userId, partnerId), updated);
          return updated;
        });
      }
    );

    return unsubscribe;
  }, [userId, partnerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (content) => {
    if (!userId || !partnerId) {
      return { success: false };
    }

    setSending(true);

    const { error: sendError } = await ChatService.sendMessage(
      userId,
      partnerId,
      content
    );

    setSending(false);

    if (sendError) {
      return { success: false, error: sendError.message };
    }

    return { success: true };
  }, [userId, partnerId]);

  return {
    messages,
    loading,
    error,
    sending,
    sendMessage,
    messagesEndRef,
  };
}
