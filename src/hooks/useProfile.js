/**
 * useProfile - Hook para gerenciamento de perfil
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ProfileService } from '../services/profileService';
import { ROUTES } from '../constants';

const profileCache = {
  data: null,
  userId: null,
};

export function useProfile(session, setView) {
  const userId = session?.user?.id;
  const hasCachedData = profileCache.userId === userId && profileCache.data !== null;

  const [profile, setProfile] = useState(hasCachedData ? profileCache.data : null);
  const [loading, setLoading] = useState(!hasCachedData);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(!hasCachedData);

  const fetchProfile = useCallback(async (showLoading = false) => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    if (showLoading || isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    const { profile: fetchedProfile, notFound, error: fetchError } =
      await ProfileService.getProfile(userId);

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      isFirstLoad.current = false;
      return;
    }

    if (notFound) {
      const { profile: newProfile, error: createError } =
        await ProfileService.createProfile(userId, session.user.email);

      if (createError) {
        setError(createError.message);
        setLoading(false);
        isFirstLoad.current = false;
        return;
      }

      setProfile(newProfile);
      profileCache.data = newProfile;
      profileCache.userId = userId;
      if (setView) {
        setView({ name: ROUTES.ACCOUNT });
      }
    }

    if (!notFound) {
      setProfile(fetchedProfile);
      profileCache.data = fetchedProfile;
      profileCache.userId = userId;
    }

    setLoading(false);
    isFirstLoad.current = false;
  }, [userId, session, setView]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!userId) {
      return { success: false };
    }

    const { error: updateError } = await ProfileService.updateProfile(
      userId,
      updates
    );

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    await fetchProfile(false);
    return { success: true };
  }, [userId, fetchProfile]);

  const refreshProfile = useCallback(() => {
    fetchProfile(true);
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile,
  };
}
