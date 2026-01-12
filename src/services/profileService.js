/**
 * ProfileService - Serviço de perfil
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 */

import { supabase } from './supabase';
import { TABLES, PROFILE, ERROR_CODES } from '../constants';
import { UsernameValidator, BioValidator } from '../domain/validators';
import { generateDefaultUsername } from '../domain/utils';
import { ErrorHandler } from './errorHandler';

export const ProfileService = {
  async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === ERROR_CODES.PROFILE_NOT_FOUND) {
          return { profile: null, notFound: true, error: null };
        }
        return { profile: null, notFound: false, error: { message: ErrorHandler.profile(error) } };
      }

      return { profile: data, notFound: false, error: null };
    } catch (error) {
      ErrorHandler.log('ProfileService.getProfile', error);
      return { profile: null, notFound: false, error: { message: ErrorHandler.profile(error) } };
    }
  },

  async createProfile(userId, email) {
    try {
      const username = generateDefaultUsername(email);

      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .insert({
          id: userId,
          username,
          bio: PROFILE.DEFAULT_BIO,
        })
        .select()
        .single();

      if (error) {
        return { profile: null, error: { message: ErrorHandler.profile(error) } };
      }

      return { profile: data, error: null };
    } catch (error) {
      ErrorHandler.log('ProfileService.createProfile', error);
      return { profile: null, error: { message: ErrorHandler.profile(error) } };
    }
  },

  async updateProfile(userId, { username, bio, avatarUrl }) {
    const updates = {
      id: userId,
      updated_at: new Date().toISOString(),
    };

    if (username !== undefined) {
      const validation = UsernameValidator.validate(username);
      if (!validation.valid) {
        return { error: { message: validation.error } };
      }
      updates.username = validation.value;
    }

    if (bio !== undefined) {
      const validation = BioValidator.validate(bio);
      if (!validation.valid) {
        return { error: { message: validation.error } };
      }
      updates.bio = validation.value;
    }

    if (avatarUrl !== undefined) {
      updates.avatar_url = avatarUrl;
    }

    try {
      const { error } = await supabase.from(TABLES.PROFILES).upsert(updates);

      if (error) {
        return { error: { message: ErrorHandler.profile(error) } };
      }

      return { error: null };
    } catch (error) {
      ErrorHandler.log('ProfileService.updateProfile', error);
      return { error: { message: ErrorHandler.profile(error) } };
    }
  },

  async upgradeToPremium(userId) {
    try {
      const { error } = await supabase
        .from(TABLES.PROFILES)
        .update({ is_premium: true })
        .eq('id', userId);

      if (error) {
        return { error: { message: ErrorHandler.profile(error) } };
      }

      return { error: null };
    } catch (error) {
      ErrorHandler.log('ProfileService.upgradeToPremium', error);
      return { error: { message: ErrorHandler.profile(error) } };
    }
  },

  async getProfilesByIds(ids) {
    if (!ids || ids.length === 0) {
      return { profiles: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('id, username, avatar_url, bio')
        .in('id', ids);

      if (error) {
        return { profiles: [], error: { message: ErrorHandler.profile(error) } };
      }

      return { profiles: data || [], error: null };
    } catch (error) {
      ErrorHandler.log('ProfileService.getProfilesByIds', error);
      return { profiles: [], error: { message: ErrorHandler.profile(error) } };
    }
  },
};
