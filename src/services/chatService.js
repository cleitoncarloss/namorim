/**
 * ChatService - Serviço de chat
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 * Regra 050: Prevenção de SQL Injection
 */

import { supabase } from './supabase';
import { TABLES, REALTIME } from '../constants';
import { MessageValidator } from '../domain/validators';
import { ErrorHandler } from './errorHandler';

export const ChatService = {
  async getMessages(userId, partnerId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.MESSAGES)
        .select('*')
        .or(
          `and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`
        )
        .order('created_at', { ascending: true });

      if (error) {
        return { messages: [], error: { message: ErrorHandler.chat(error) } };
      }

      return { messages: data || [], error: null };
    } catch (error) {
      ErrorHandler.log('ChatService.getMessages', error);
      return { messages: [], error: { message: ErrorHandler.chat(error) } };
    }
  },

  async sendMessage(senderId, receiverId, content) {
    const validation = MessageValidator.validate(content);
    if (!validation.valid) {
      return { error: { message: validation.error } };
    }

    try {
      const { error } = await supabase
        .from(TABLES.MESSAGES)
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          content: validation.value,
        });

      if (error) {
        return { error: { message: ErrorHandler.chat(error) } };
      }

      return { error: null };
    } catch (error) {
      ErrorHandler.log('ChatService.sendMessage', error);
      return { error: { message: ErrorHandler.chat(error) } };
    }
  },

  subscribeToMessages(userId, partnerId, onNewMessage) {
    const channelName = `${REALTIME.CHAT_CHANNEL_PREFIX}:${userId}:${partnerId}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: REALTIME.EVENT_INSERT,
          schema: 'public',
          table: TABLES.MESSAGES,
        },
        (payload) => {
          const message = payload.new;
          const isRelevant =
            (message.sender_id === userId && message.receiver_id === partnerId) ||
            (message.sender_id === partnerId && message.receiver_id === userId);

          if (isRelevant) {
            onNewMessage(message);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};
