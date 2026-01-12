/**
 * ErrorHandler centralizado
 * Regra 027: Tratamento de Erros de Domínio
 * Regra 046: Tratamento de Erros Seguro
 * Regra 063: Proteção contra Information Disclosure
 */

import { ERROR_MESSAGES } from '../constants/errors';

const AUTH_ERROR_MAP = {
  'Invalid login credentials': ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS,
  'Email not confirmed': ERROR_MESSAGES.AUTH_EMAIL_NOT_CONFIRMED,
  'User already registered': ERROR_MESSAGES.AUTH_USER_EXISTS,
  'Password should be at least 6 characters': ERROR_MESSAGES.AUTH_WEAK_PASSWORD,
};

const PROFILE_ERROR_MAP = {
  PGRST116: ERROR_MESSAGES.PROFILE_NOT_FOUND,
};

function mapErrorMessage(error, errorMap, defaultMessage) {
  if (!error) {
    return defaultMessage;
  }

  const errorMessage = error.message || error.code || String(error);

  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  return defaultMessage;
}

export const ErrorHandler = {
  auth(error) {
    return mapErrorMessage(error, AUTH_ERROR_MAP, ERROR_MESSAGES.AUTH_GENERIC);
  },

  profile(error) {
    return mapErrorMessage(error, PROFILE_ERROR_MAP, ERROR_MESSAGES.PROFILE_LOAD_FAILED);
  },

  discovery(error) {
    return mapErrorMessage(error, {}, ERROR_MESSAGES.DISCOVERY_LOAD_FAILED);
  },

  matches(error) {
    return mapErrorMessage(error, {}, ERROR_MESSAGES.MATCHES_LOAD_FAILED);
  },

  chat(error) {
    return mapErrorMessage(error, {}, ERROR_MESSAGES.CHAT_LOAD_FAILED);
  },

  upload(error) {
    return mapErrorMessage(error, {}, ERROR_MESSAGES.UPLOAD_FAILED);
  },

  generic(error) {
    return mapErrorMessage(error, {}, ERROR_MESSAGES.GENERIC_ERROR);
  },

  /**
   * Log de erro seguro (sem expor dados sensíveis em produção)
   */
  log(context, error) {
    if (import.meta.env.DEV) {
      console.error(`[${context}]`, error);
    }
  },
};
