/**
 * AppContext - Context para estado global da aplicação
 * Regra 014: Dependency Inversion Principle
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/authService';
import { ProfileService } from '../services/profileService';
import { ROUTES } from '../constants';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState({ name: ROUTES.HOME });
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
      return;
    }

    const { profile: fetchedProfile, notFound, error } =
      await ProfileService.getProfile(session.user.id);

    if (error) {
      return;
    }

    if (notFound) {
      const { profile: newProfile, error: createError } =
        await ProfileService.createProfile(session.user.id, session.user.email);

      if (!createError) {
        setProfile(newProfile);
        setView({ name: ROUTES.ACCOUNT });
      }
    } else {
      setProfile(fetchedProfile);
    }
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (view.force_reload) {
      fetchProfile();
    }
  }, [view.force_reload, fetchProfile]);

  const navigateTo = useCallback((viewName, options = {}) => {
    setView({ name: viewName, ...options });
  }, []);

  const refreshProfile = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  const value = {
    session,
    profile,
    view,
    setView,
    navigateTo,
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
