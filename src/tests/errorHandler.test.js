/**
 * Testes do ErrorHandler
 * Regra 032: Cobertura Mínima de Teste
 * Regra 046: Tratamento de Erros Seguro
 */

import { describe, it, expect, vi } from 'vitest';
import { ErrorHandler } from '../services/errorHandler';
import { ERROR_MESSAGES } from '../constants/errors';

describe('ErrorHandler', () => {
  describe('auth', () => {
    it('retorna mensagem genérica quando erro é null', () => {
      const result = ErrorHandler.auth(null);

      expect(result).toBe(ERROR_MESSAGES.AUTH_GENERIC);
    });

    it('mapeia erro de credenciais inválidas', () => {
      const error = { message: 'Invalid login credentials' };
      const result = ErrorHandler.auth(error);

      expect(result).toBe(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS);
    });

    it('mapeia erro de email não confirmado', () => {
      const error = { message: 'Email not confirmed' };
      const result = ErrorHandler.auth(error);

      expect(result).toBe(ERROR_MESSAGES.AUTH_EMAIL_NOT_CONFIRMED);
    });

    it('mapeia erro de usuário já registrado', () => {
      const error = { message: 'User already registered' };
      const result = ErrorHandler.auth(error);

      expect(result).toBe(ERROR_MESSAGES.AUTH_USER_EXISTS);
    });

    it('mapeia erro de senha fraca', () => {
      const error = { message: 'Password should be at least 6 characters' };
      const result = ErrorHandler.auth(error);

      expect(result).toBe(ERROR_MESSAGES.AUTH_WEAK_PASSWORD);
    });

    it('retorna mensagem genérica para erro desconhecido', () => {
      const error = { message: 'Unknown error xyz' };
      const result = ErrorHandler.auth(error);

      expect(result).toBe(ERROR_MESSAGES.AUTH_GENERIC);
    });
  });

  describe('profile', () => {
    it('retorna mensagem genérica quando erro é null', () => {
      const result = ErrorHandler.profile(null);

      expect(result).toBe(ERROR_MESSAGES.PROFILE_LOAD_FAILED);
    });

    it('mapeia erro de perfil não encontrado', () => {
      const error = { code: 'PGRST116' };
      const result = ErrorHandler.profile(error);

      expect(result).toBe(ERROR_MESSAGES.PROFILE_NOT_FOUND);
    });

    it('retorna mensagem genérica para erro desconhecido', () => {
      const error = { message: 'Database error' };
      const result = ErrorHandler.profile(error);

      expect(result).toBe(ERROR_MESSAGES.PROFILE_LOAD_FAILED);
    });
  });

  describe('discovery', () => {
    it('retorna mensagem apropriada', () => {
      const error = { message: 'Error' };
      const result = ErrorHandler.discovery(error);

      expect(result).toBe(ERROR_MESSAGES.DISCOVERY_LOAD_FAILED);
    });
  });

  describe('matches', () => {
    it('retorna mensagem apropriada', () => {
      const error = { message: 'Error' };
      const result = ErrorHandler.matches(error);

      expect(result).toBe(ERROR_MESSAGES.MATCHES_LOAD_FAILED);
    });
  });

  describe('chat', () => {
    it('retorna mensagem apropriada', () => {
      const error = { message: 'Error' };
      const result = ErrorHandler.chat(error);

      expect(result).toBe(ERROR_MESSAGES.CHAT_LOAD_FAILED);
    });
  });

  describe('upload', () => {
    it('retorna mensagem apropriada', () => {
      const error = { message: 'Error' };
      const result = ErrorHandler.upload(error);

      expect(result).toBe(ERROR_MESSAGES.UPLOAD_FAILED);
    });
  });

  describe('generic', () => {
    it('retorna mensagem genérica', () => {
      const error = { message: 'Error' };
      const result = ErrorHandler.generic(error);

      expect(result).toBe(ERROR_MESSAGES.GENERIC_ERROR);
    });
  });

  describe('log', () => {
    it('loga apenas em ambiente de desenvolvimento', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      ErrorHandler.log('TEST', new Error('Test error'));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
