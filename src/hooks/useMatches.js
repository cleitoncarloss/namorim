/**
 * useMatches - Hook para lista de matches
 * Regra 010: Single Responsibility Principle
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MatchService } from '../services/matchService';

const matchesCache = {
  data: null,
  userId: null,
};

export function useMatches(session) {
  const userId = session?.user?.id;
  const hasCachedData = matchesCache.userId === userId && matchesCache.data !== null;

  const [matches, setMatches] = useState(hasCachedData ? matchesCache.data : []);
  const [loading, setLoading] = useState(!hasCachedData);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(!hasCachedData);

  const fetchMatches = useCallback(async (showLoading = false) => {
    if (!userId) {
      return;
    }

    if (showLoading || isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    const { matches: fetchedMatches, error: fetchError } =
      await MatchService.getMatches(userId);

    if (fetchError) {
      setError(fetchError.message);
    }

    if (!fetchError) {
      setMatches(fetchedMatches);
      matchesCache.data = fetchedMatches;
      matchesCache.userId = userId;
    }

    setLoading(false);
    isFirstLoad.current = false;
  }, [userId]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return {
    matches,
    loading,
    error,
    refreshMatches: () => fetchMatches(true),
  };
}
