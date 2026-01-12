/**
 * MatchService - Serviço de matches
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 */

import { supabase } from './supabase';
import { TABLES } from '../constants';
import { extractUserIds, findMatchingIds, findExclusiveIds } from '../domain/utils';
import { ProfileService } from './profileService';
import { ErrorHandler } from './errorHandler';

export const MatchService = {
  async getMatches(userId) {
    try {
      // Busca quem o usuário curtiu
      const { data: myLikes, error: myLikesError } = await supabase
        .from(TABLES.LIKES)
        .select('liked_user_id')
        .eq('user_id', userId);

      if (myLikesError) {
        return { matches: [], error: { message: ErrorHandler.matches(myLikesError) } };
      }

      // Busca quem curtiu o usuário
      const { data: likedMe, error: likedMeError } = await supabase
        .from(TABLES.LIKES)
        .select('user_id')
        .eq('liked_user_id', userId);

      if (likedMeError) {
        return { matches: [], error: { message: ErrorHandler.matches(likedMeError) } };
      }

      const myLikedIds = extractUserIds(myLikes || [], 'liked_user_id');
      const likedMeIds = extractUserIds(likedMe || [], 'user_id');

      // Encontra matches (curtida mútua)
      const matchIds = findMatchingIds(myLikedIds, likedMeIds);

      if (matchIds.length === 0) {
        return { matches: [], error: null };
      }

      const { profiles, error } = await ProfileService.getProfilesByIds(matchIds);

      if (error) {
        return { matches: [], error };
      }

      return { matches: profiles, error: null };
    } catch (error) {
      ErrorHandler.log('MatchService.getMatches', error);
      return { matches: [], error: { message: ErrorHandler.matches(error) } };
    }
  },

  async getAdmirers(userId) {
    try {
      // Busca quem curtiu o usuário
      const { data: likedMe, error: likedMeError } = await supabase
        .from(TABLES.LIKES)
        .select('user_id')
        .eq('liked_user_id', userId);

      if (likedMeError) {
        return { admirers: [], error: { message: ErrorHandler.matches(likedMeError) } };
      }

      // Busca quem o usuário já curtiu
      const { data: myLikes, error: myLikesError } = await supabase
        .from(TABLES.LIKES)
        .select('liked_user_id')
        .eq('user_id', userId);

      if (myLikesError) {
        return { admirers: [], error: { message: ErrorHandler.matches(myLikesError) } };
      }

      const likedMeIds = extractUserIds(likedMe || [], 'user_id');
      const myLikedIds = extractUserIds(myLikes || [], 'liked_user_id');

      // Encontra admiradores (curtiu mas ainda não foi curtido de volta)
      const admirerIds = findExclusiveIds(likedMeIds, myLikedIds);

      if (admirerIds.length === 0) {
        return { admirers: [], error: null };
      }

      const { profiles, error } = await ProfileService.getProfilesByIds(admirerIds);

      if (error) {
        return { admirers: [], error };
      }

      return { admirers: profiles, error: null };
    } catch (error) {
      ErrorHandler.log('MatchService.getAdmirers', error);
      return { admirers: [], error: { message: ErrorHandler.matches(error) } };
    }
  },

  async likeBack(userId, admirerId) {
    try {
      const { error } = await supabase
        .from(TABLES.LIKES)
        .insert({ user_id: userId, liked_user_id: admirerId });

      if (error) {
        return { error: { message: ErrorHandler.matches(error) } };
      }

      return { error: null };
    } catch (error) {
      ErrorHandler.log('MatchService.likeBack', error);
      return { error: { message: ErrorHandler.matches(error) } };
    }
  },
};
