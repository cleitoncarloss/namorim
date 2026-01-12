/**
 * Testes de Constantes
 * Regra 024: Proibição de Constantes Mágicas
 * Regra 029: Imutabilidade de Objetos
 */

import { describe, it, expect } from 'vitest';
import {
  ERROR_CODES,
  VALIDATION,
  STORAGE,
  PROFILE,
  ROUTES,
  TABLES,
} from '../constants';

describe('Constants', () => {
  describe('ERROR_CODES', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(ERROR_CODES)).toBe(true);
    });

    it('contém código para perfil não encontrado', () => {
      expect(ERROR_CODES.PROFILE_NOT_FOUND).toBe('PGRST116');
    });
  });

  describe('VALIDATION', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(VALIDATION)).toBe(true);
    });

    it('define tamanho mínimo de senha', () => {
      expect(VALIDATION.MIN_PASSWORD_LENGTH).toBe(6);
    });

    it('define tamanho máximo de username', () => {
      expect(VALIDATION.MAX_USERNAME_LENGTH).toBe(30);
    });

    it('define tamanho máximo de bio', () => {
      expect(VALIDATION.MAX_BIO_LENGTH).toBe(500);
    });

    it('define tamanho máximo de mensagem', () => {
      expect(VALIDATION.MAX_MESSAGE_LENGTH).toBe(1000);
    });
  });

  describe('STORAGE', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(STORAGE)).toBe(true);
    });

    it('define bucket de avatars', () => {
      expect(STORAGE.AVATARS_BUCKET).toBe('avatars');
    });

    it('define tipos de imagem permitidos', () => {
      expect(STORAGE.ALLOWED_IMAGE_TYPES).toContain('image/jpeg');
      expect(STORAGE.ALLOWED_IMAGE_TYPES).toContain('image/png');
      expect(STORAGE.ALLOWED_IMAGE_TYPES).toContain('image/webp');
    });

    it('define extensões permitidas', () => {
      expect(STORAGE.ALLOWED_IMAGE_EXTENSIONS).toContain('jpg');
      expect(STORAGE.ALLOWED_IMAGE_EXTENSIONS).toContain('jpeg');
      expect(STORAGE.ALLOWED_IMAGE_EXTENSIONS).toContain('png');
      expect(STORAGE.ALLOWED_IMAGE_EXTENSIONS).toContain('webp');
    });

    it('define tamanho máximo de 5MB', () => {
      expect(STORAGE.MAX_IMAGE_SIZE_BYTES).toBe(5 * 1024 * 1024);
    });
  });

  describe('PROFILE', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(PROFILE)).toBe(true);
    });

    it('define batch size para discovery', () => {
      expect(PROFILE.BATCH_SIZE).toBe(10);
    });

    it('define bio padrão', () => {
      expect(PROFILE.DEFAULT_BIO).toBeTruthy();
    });
  });

  describe('ROUTES', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(ROUTES)).toBe(true);
    });

    it('define todas as rotas principais', () => {
      expect(ROUTES.HOME).toBe('home');
      expect(ROUTES.ACCOUNT).toBe('account');
      expect(ROUTES.MESSAGES).toBe('messages');
      expect(ROUTES.MATCHES).toBe('matches');
      expect(ROUTES.CHAT).toBe('chat');
      expect(ROUTES.LIKES_YOU).toBe('likes-you');
    });
  });

  describe('TABLES', () => {
    it('está congelado (imutável)', () => {
      expect(Object.isFrozen(TABLES)).toBe(true);
    });

    it('define todas as tabelas', () => {
      expect(TABLES.PROFILES).toBe('profiles');
      expect(TABLES.LIKES).toBe('likes');
      expect(TABLES.DISLIKES).toBe('dislikes');
      expect(TABLES.MESSAGES).toBe('messages');
    });
  });
});
