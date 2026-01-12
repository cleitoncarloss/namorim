/**
 * useAuth - Hook para autenticação
 * Regra 010: Single Responsibility Principle
 */

import { useState, useCallback } from 'react';
import { AuthService } from '../services/authService';
import { SUCCESS_MESSAGES } from '../constants/errors';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const signUp = useCallback(async (email, password) => {
    clearMessages();
    setLoading(true);

    const { data, error: authError } = await AuthService.signUp(email, password);

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false };
    }

    setSuccessMessage(SUCCESS_MESSAGES.ACCOUNT_CREATED);
    return { success: true, data };
  }, [clearMessages]);

  const signIn = useCallback(async (email, password) => {
    clearMessages();
    setLoading(true);

    const { data, error: authError } = await AuthService.signIn(email, password);

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false };
    }

    return { success: true, data };
  }, [clearMessages]);

  const signOut = useCallback(async () => {
    setLoading(true);
    const { error: authError } = await AuthService.signOut();
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return { success: false };
    }

    return { success: true };
  }, []);

  return {
    loading,
    error,
    successMessage,
    signUp,
    signIn,
    signOut,
    clearMessages,
  };
}
