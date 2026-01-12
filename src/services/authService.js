/**
 * AuthService - Serviço de autenticação
 * Regra 010: Single Responsibility Principle
 * Regra 014: Dependency Inversion Principle
 */

import { supabase } from './supabase';
import { EmailValidator, PasswordValidator } from '../domain/validators';
import { ErrorHandler } from './errorHandler';

export const AuthService = {
  async signUp(email, password) {
    const emailValidation = EmailValidator.validate(email);
    if (!emailValidation.valid) {
      return { data: null, error: { message: emailValidation.error } };
    }

    const passwordValidation = PasswordValidator.validate(password);
    if (!passwordValidation.valid) {
      return { data: null, error: { message: passwordValidation.error } };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailValidation.value,
        password: passwordValidation.value,
      });

      if (error) {
        return { data: null, error: { message: ErrorHandler.auth(error) } };
      }

      return { data, error: null };
    } catch (error) {
      ErrorHandler.log('AuthService.signUp', error);
      return { data: null, error: { message: ErrorHandler.auth(error) } };
    }
  },

  async signIn(email, password) {
    const emailValidation = EmailValidator.validate(email);
    if (!emailValidation.valid) {
      return { data: null, error: { message: emailValidation.error } };
    }

    const passwordValidation = PasswordValidator.validate(password);
    if (!passwordValidation.valid) {
      return { data: null, error: { message: passwordValidation.error } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailValidation.value,
        password: passwordValidation.value,
      });

      if (error) {
        return { data: null, error: { message: ErrorHandler.auth(error) } };
      }

      return { data, error: null };
    } catch (error) {
      ErrorHandler.log('AuthService.signIn', error);
      return { data: null, error: { message: ErrorHandler.auth(error) } };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: { message: ErrorHandler.auth(error) } };
      }
      return { error: null };
    } catch (error) {
      ErrorHandler.log('AuthService.signOut', error);
      return { error: { message: ErrorHandler.auth(error) } };
    }
  },

  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return { session: null, error: { message: ErrorHandler.auth(error) } };
      }
      return { session: data.session, error: null };
    } catch (error) {
      ErrorHandler.log('AuthService.getSession', error);
      return { session: null, error: { message: ErrorHandler.auth(error) } };
    }
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
