/**
 * DiscoveryService - Serviço de descoberta de perfis
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 * Regra 050: Prevenção de SQL Injection
 */

import { supabase } from './supabase';
import { TABLES, PROFILE, SWIPE_ACTIONS } from '../constants';
import { extractUserIds } from '../domain/utils';
import { ErrorHandler } from './errorHandler';

export const DiscoveryService = {
  async getSeenUserIds(userId) {
    try {
      const [likesResult, dislikesResult] = await Promise.all([
        supabase
          .from(TABLES.LIKES)
          .select('liked_user_id')
          .eq('user_id', userId),
        supabase
          .from(TABLES.DISLIKES)
          .select('disliked_user_id')
          .eq('user_id', userId),
      ]);

      if (likesResult.error) {
        return { ids: [], error: { message: ErrorHandler.discovery(likesResult.error) } };
      }

      if (dislikesResult.error) {
        return { ids: [], error: { message: ErrorHandler.discovery(dislikesResult.error) } };
      }

      const likedIds = extractUserIds(likesResult.data || [], 'liked_user_id');
      const dislikedIds = extractUserIds(dislikesResult.data || [], 'disliked_user_id');

      return { ids: [...likedIds, ...dislikedIds], error: null };
    } catch (error) {
      ErrorHandler.log('DiscoveryService.getSeenUserIds', error);
      return { ids: [], error: { message: ErrorHandler.discovery(error) } };
    }
  },

  async getDiscoverableProfiles(userId, excludeIds = []) {
    try {
      const allExcludedIds = [userId, ...excludeIds];

      // Usando o método correto do Supabase para evitar SQL injection
      let query = supabase
        .from(TABLES.PROFILES)
        .select('*')
        .limit(PROFILE.BATCH_SIZE);

      // Filtra IDs de forma segura
      if (allExcludedIds.length > 0) {
        query = query.not('id', 'in', `(${allExcludedIds.join(',')})`);
      }

      const { data, error } = await query;

      if (error) {
        return { profiles: [], error: { message: ErrorHandler.discovery(error) } };
      }

      return { profiles: data || [], error: null };
    } catch (error) {
      ErrorHandler.log('DiscoveryService.getDiscoverableProfiles', error);
      return { profiles: [], error: { message: ErrorHandler.discovery(error) } };
    }
  },

  async recordSwipe(userId, targetUserId, action) {
    try {
      const table = action === SWIPE_ACTIONS.LIKE ? TABLES.LIKES : TABLES.DISLIKES;
      const column = action === SWIPE_ACTIONS.LIKE ? 'liked_user_id' : 'disliked_user_id';

      const { error } = await supabase
        .from(table)
        .insert({ user_id: userId, [column]: targetUserId });

      if (error) {
        return { error: { message: ErrorHandler.discovery(error) } };
      }

      return { error: null };
    } catch (error) {
      ErrorHandler.log('DiscoveryService.recordSwipe', error);
      return { error: { message: ErrorHandler.discovery(error) } };
    }
  },

  async checkForMatch(userId, targetUserId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.LIKES)
        .select('user_id')
        .eq('user_id', targetUserId)
        .eq('liked_user_id', userId);

      if (error) {
        ErrorHandler.log('DiscoveryService.checkForMatch', error);
        return { isMatch: false };
      }

      return { isMatch: data && data.length > 0 };
    } catch (error) {
      ErrorHandler.log('DiscoveryService.checkForMatch', error);
      return { isMatch: false };
    }
  },
};
