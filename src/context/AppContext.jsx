/**
 * AppContext - Context para estado global da aplicação
 * Regra 014: Dependency Inversion Principle
 * Regra 010: Single Responsibility - gerencia estado de auth e perfil
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/authService';
import { ProfileService } from '../services/profileService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getSession().then(({ session: currentSession }) => {
      setSession(currentSession);
      setLoading(false);
    });

    const { data: { subscription } } = AuthService.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (!newSession) {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) {
      setProfile(null);
      return { needsSetup: false };
    }

    const { profile: fetchedProfile, notFound, error } =
      await ProfileService.getProfile(session.user.id);

    if (error) {
      return { needsSetup: false };
    }

    if (notFound) {
      const { profile: newProfile, error: createError } =
        await ProfileService.createProfile(session.user.id, session.user.email);

      if (!createError) {
        setProfile(newProfile);
        return { needsSetup: true };
      }
      return { needsSetup: false };
    }

    setProfile(fetchedProfile);
    return { needsSetup: false };
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  const value = {
    session,
    profile,
    loading,
    refreshProfile,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
