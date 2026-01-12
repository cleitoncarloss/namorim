/**
 * useDiscovery - Hook para descoberta de perfis
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { DiscoveryService } from '../services/discoveryService';
import { SWIPE_ACTIONS } from '../constants';

const discoveryCache = {
  data: null,
  userId: null,
};

export function useDiscovery(session) {
  const userId = session?.user?.id;
  const hasCachedData = discoveryCache.userId === userId && discoveryCache.data !== null;

  const [profiles, setProfiles] = useState(hasCachedData ? discoveryCache.data : []);
  const [loading, setLoading] = useState(!hasCachedData);
  const [error, setError] = useState(null);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const isFirstLoad = useRef(!hasCachedData);

  const fetchProfiles = useCallback(async (showLoading = false) => {
    if (!userId) {
      return;
    }

    if (showLoading || isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    const { ids: seenIds, error: seenError } =
      await DiscoveryService.getSeenUserIds(userId);

    if (seenError) {
      setError(seenError.message);
      setLoading(false);
      isFirstLoad.current = false;
      return;
    }

    const { profiles: discoverableProfiles, error: profilesError } =
      await DiscoveryService.getDiscoverableProfiles(userId, seenIds);

    if (profilesError) {
      setError(profilesError.message);
      setLoading(false);
      isFirstLoad.current = false;
      return;
    }

    setProfiles(discoverableProfiles);
    discoveryCache.data = discoverableProfiles;
    discoveryCache.userId = userId;
    setLoading(false);
    isFirstLoad.current = false;
  }, [userId]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleSwipe = useCallback(async (targetUserId, action) => {
    if (!session?.user?.id) {
      return { success: false };
    }

    const currentProfile = profiles.find(p => p.id === targetUserId);

    const { error: swipeError } = await DiscoveryService.recordSwipe(
      session.user.id,
      targetUserId,
      action
    );

    if (swipeError) {
      return { success: false, error: swipeError.message };
    }

    if (action === SWIPE_ACTIONS.LIKE) {
      const { isMatch } = await DiscoveryService.checkForMatch(
        session.user.id,
        targetUserId
      );

      if (isMatch && currentProfile) {
        setMatchedProfile(currentProfile);
      }
    }

    setProfiles(prev => {
      const updated = prev.filter(p => p.id !== targetUserId);
      discoveryCache.data = updated;
      return updated;
    });
    return { success: true };
  }, [session, profiles]);

  const handleLike = useCallback((targetUserId) => {
    return handleSwipe(targetUserId, SWIPE_ACTIONS.LIKE);
  }, [handleSwipe]);

  const handleDislike = useCallback((targetUserId) => {
    return handleSwipe(targetUserId, SWIPE_ACTIONS.DISLIKE);
  }, [handleSwipe]);

  const dismissMatch = useCallback(() => {
    setMatchedProfile(null);
  }, []);

  const currentProfile = profiles[0] || null;

  return {
    profiles,
    currentProfile,
    loading,
    error,
    matchedProfile,
    handleLike,
    handleDislike,
    dismissMatch,
    refreshProfiles: () => fetchProfiles(true),
  };
}
