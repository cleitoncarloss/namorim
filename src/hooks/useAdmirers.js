/**
 * useAdmirers - Hook para lista de admiradores (quem curtiu)
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MatchService } from '../services/matchService';

const admirersCache = {
  data: null,
  userId: null,
};

export function useAdmirers(session) {
  const userId = session?.user?.id;
  const hasCachedData = admirersCache.userId === userId && admirersCache.data !== null;

  const [admirers, setAdmirers] = useState(hasCachedData ? admirersCache.data : []);
  const [loading, setLoading] = useState(!hasCachedData);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(!hasCachedData);

  const fetchAdmirers = useCallback(async (showLoading = false) => {
    if (!userId) {
      return;
    }

    if (showLoading || isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    const { admirers: fetchedAdmirers, error: fetchError } =
      await MatchService.getAdmirers(userId);

    if (fetchError) {
      setError(fetchError.message);
    }

    if (!fetchError) {
      setAdmirers(fetchedAdmirers);
      admirersCache.data = fetchedAdmirers;
      admirersCache.userId = userId;
    }

    setLoading(false);
    isFirstLoad.current = false;
  }, [userId]);

  useEffect(() => {
    fetchAdmirers();
  }, [fetchAdmirers]);

  const likeBack = useCallback(async (admirerId) => {
    if (!session?.user?.id) {
      return { success: false };
    }

    const { error: likeError } = await MatchService.likeBack(
      session.user.id,
      admirerId
    );

    if (likeError) {
      return { success: false, error: likeError.message };
    }

    setAdmirers(prev => {
      const updated = prev.filter(a => a.id !== admirerId);
      admirersCache.data = updated;
      return updated;
    });
    return { success: true };
  }, [session]);

  return {
    admirers,
    loading,
    error,
    likeBack,
    refreshAdmirers: () => fetchAdmirers(true),
  };
}
